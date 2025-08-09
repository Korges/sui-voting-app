module momentary::dashboard;

// === Imports ===

use sui::types;

// === Errors ===

const EInvalidOtw: u64 = 1;

// === Structs ===

public struct Dashboard has key {
    id: UID,
    moments_ids: vector<ID>
}

public struct AdminCap has key {
    id: UID,
}

public struct CreatorCap has key {
    id: UID,
    creator: address
}

public struct DASHBOARD has drop {}

/// === Init (deploy-time) ===

fun init(otw: DASHBOARD, ctx: &mut TxContext) {
    let otw = otw;
    new(otw, ctx);

    transfer::transfer(
    AdminCap {id: object::new(ctx)},
    ctx.sender()
    );
}

fun new(otw: DASHBOARD, ctx: &mut TxContext) {
    assert!(types::is_one_time_witness(&otw), EInvalidOtw);

    let dashboard = Dashboard {
        id: object::new(ctx),
        moments_ids: vector[]
    };

    transfer::share_object(dashboard);

}

/// === Admin Functions ===

public fun grant_creator_cap(_admin_cap: &AdminCap, creator_address: address, ctx: &mut TxContext) {
    transfer::transfer(
    CreatorCap {id: object::new(ctx), creator: creator_address}, 
    ctx.sender()
    );
}

public fun revoke_creator_cap(_admin: &AdminCap, cap: CreatorCap) {
    let CreatorCap {id, creator: _} = cap;
    object::delete(id);
}