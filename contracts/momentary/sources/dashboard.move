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

public struct DASHBOARD has drop {}

fun init(otw: DASHBOARD, ctx: &mut TxContext) {
    let otw = otw;
    new(otw, ctx);

    transfer::transfer(
        AdminCap {id: object::new(ctx)},
        ctx.sender()
    );
}

public fun new(otw: DASHBOARD, ctx: &mut TxContext) {
    assert!(types::is_one_time_witness(&otw), EInvalidOtw);

    let dashboard = Dashboard {
        id: object::new(ctx),
        moments_ids: vector[]
    };

    transfer::share_object(dashboard);
}
