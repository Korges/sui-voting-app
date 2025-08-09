module momentary::moment;

// === Imports ===

use std::string::String;
use sui::clock::{Clock};
use sui::table::{Self, Table};
use momentary::dashboard::CreatorCap;

// === Errors ===

const EMintExpired: u64 = 0;
const ESupplyExceeded: u64 = 1;
const EAlreadyMinted: u64 = 2;
const ENotActive: u64 = 3;
const EActive: u64 = 4;

// === Enums ===

public enum MomentStatus has store, drop, copy {
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
    status: MomentStatus
}

public struct MomentNFT has key {
    id: UID,
    moment_id: ID
}

// === Public Functions ===

public fun mint(self: &mut Moment, clock: &Clock, ctx: &mut TxContext): ID {
    assert!(self.mint_expiration > clock.timestamp_ms(), EMintExpired);
    assert!(self.mint_total_supply > self.mint_count, ESupplyExceeded);
    assert!(!self.mint_addresses.contains(ctx.sender()), EAlreadyMinted);
    assert!(self.status == MomentStatus::Active, ENotActive);

    self.mint_count = self.mint_count + 1;

    table::add(&mut self.mint_addresses, ctx.sender(), true);

    let moment_nft = MomentNFT {
        id: object::new(ctx),
        moment_id: self.id.to_inner()
    };

    let moment_nft_id = moment_nft.id.to_inner();
    transfer::transfer(moment_nft, ctx.sender());

    moment_nft_id
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

// === Creator Functions ===

public fun create(
    _creator_cap: &CreatorCap,
    title: String,
    description: String,
    mint_total_supply: u64,
    mint_expiration: u64,
    mint_price: u64,
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
        status: MomentStatus::Active
    };

    let id = moment.id.to_inner();
    transfer::share_object(moment);

    id
}

public fun deactivate(_creator_cap: &CreatorCap, moment: &mut Moment) {
    assert!(moment.status == MomentStatus::Active, EActive);

    moment.status = MomentStatus::Delisted
}

