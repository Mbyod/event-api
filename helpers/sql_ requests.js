const sqlRequests = {
    get_categoties : 'select _Description from _Reference77 where _ParentIDRRef like 0x00000000000000000000000000000000',
    select_from_events : 'select * from NewEvents',
    delete_from_events: 'delete from NewEvents where EventId in'
}

module.exports = sqlRequests;