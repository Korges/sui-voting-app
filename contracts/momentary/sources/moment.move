module momentary::moment;

use std::string::String;
use sui::url::Url;
use sui::clock::{Clock, timestamp_ms};
use sui::table::{Self, Table};

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
        created_at: timestamp_ms(clock),
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