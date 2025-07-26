module momentary::moment;

// === Imports ===
use std::string::String;
use sui::url::Url;
use sui::clock::{Self, Clock};
use sui::table::{Self, Table};

// === Errors ===
const EMintExpired: u64 = 0;
const ESupplyExceeded: u64 = 1;
const EAlreadyMinted: u64 = 2;

// === Enums ===
public enum MomentStatus has store, drop {
    Active,
    Delisted,
}

// === Structs ===
public struct Moment has key {
    id: UID,
    creator: address,
    title: String,
    description: String,
    created_at: u64,
    mint_count: u64,
    mint_total_supply: u64,
    mint_expiration: u64,
    mint_addresses: Table<address, bool>,
    mint_price: u64,
    status: MomentStatus,
    url: Url
}

public struct AdminCap has key {
    id: UID,
}

public struct MomentNFT has key {
    id: UID,
    moment_id: ID
}

fun init(ctx: &mut TxContext) {
    let admin_cap = AdminCap {
        id: object::new(ctx)
    };

    transfer::transfer(
        admin_cap,
        ctx.sender()
    );
}

// === Public Functions ===

public fun mint(self: &mut Moment, clock: &Clock, ctx: &mut TxContext) {
    assert!(self.mint_expiration > clock.timestamp_ms(), EMintExpired);
    assert!(self.mint_total_supply > self.mint_count, ESupplyExceeded);
    assert!(self.mint_addresses.contains(ctx.sender()), EAlreadyMinted);

    self.mint_count = self.mint_count + 1;

    table::add(&mut self.mint_addresses, ctx.sender(), true);

    let moment_nft = MomentNFT {
        id: object::new(ctx),
        moment_id: self.id.to_inner()
    };

    transfer::transfer(moment_nft, ctx.sender());
}

// === View Functions ===

public fun creator(self: &Moment): address {
    self.creator
}

public fun title(self: &Moment): String {
    self.title
}

public fun description(self: &Moment): String {
    self.description
}

public fun mint_expiration(self: &Moment): u64 {
    self.mint_expiration
}

public fun mint_addresses(self: &Moment): &Table<address, bool> {
    &self.mint_addresses
}

public fun status(self: &Moment): &MomentStatus {
    &self.status
}

// === Admin Functions ===

public fun create(
    _admin_cap: &AdminCap,
    title: String,
    description: String,
    mint_total_supply: u64,
    mint_expiration: u64,
    mint_price: u64,
    url: Url,
    clock: &Clock, 
    ctx: &mut TxContext
): ID {
    let moment = Moment {
        id: object::new(ctx),
        creator: ctx.sender(),
        title,
        description,
        created_at: clock.timestamp_ms(),
        mint_count: 0,
        mint_total_supply,
        mint_expiration,
        mint_addresses: table::new(ctx),
        mint_price,
        status: MomentStatus::Active,
        url,
    };

    let id = moment.id.to_inner();
    transfer::share_object(moment);

    id
}

