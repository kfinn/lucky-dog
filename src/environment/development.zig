const std = @import("std");

const lucky_dog = @import("../lucky_dog.zig");

pub const config: lucky_dog.App.Config = .{
    .db = .{
        .connect = .{
            .host = "db",
            .port = 5432,
        },
        .auth = .{
            .username = "lucky_dog",
            .password = "password",
            .database = "lucky_dog",
            .application_name = "LuckyDog",
        },
    },
    .session = .{
        .cookie_secret_key = "d1d6aa8cd7fd3cfe30b358113aa5ab83",
    },
    .httpz = .{
        .port = 5882,
        .request = .{
            .max_query_count = 1024,
            .max_form_count = 1024,
        },
    },
};
