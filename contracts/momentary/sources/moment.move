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

// === Structs ===
public struct Moment has key {
    id: UID,
    creator: address,
    name: String,
    description: String,
    created_at: u64,
    mint_count: u64,
    mint_total_supply: u64,
    mint_expiration: u64,
    mint_addresses: Table<address, bool>,
    mint_price: u64,
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

// === Admin Functions ===

public fun create(
    _admin_cap: &AdminCap,
    name: String,
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
        name,
        description,
        created_at: clock.timestamp_ms(),
        mint_count: 0,
        mint_total_supply,
        mint_expiration,
        mint_addresses: table::new(ctx),
        mint_price,
        url,
    };

    let id = moment.id.to_inner();
    transfer::share_object(moment);

    id
}

