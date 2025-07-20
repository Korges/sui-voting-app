module momentary::moment;

use std::string::String;
use sui::url::Url;
use sui::table::Table;

public struct Moment has key {
    id: UID,
    name: String,
    description: String,
    creator: address,
    mint_max_supply: u64,
    mint_total_supply: u64,
    mint_until: u64,
    mint_addresses: Table<address, bool>,
    mint_price: u64,
    url: Url
}

public struct MomentNFT has key {
    id: UID,
    moment_id: ID
}