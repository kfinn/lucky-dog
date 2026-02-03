const std = @import("std");

const environment_options = @import("environment");
const mantle = @import("mantle");

pub const App = mantle.App(.{
    .router = .{
        .root = .{
            .Controller = @import("controllers/homes_controller.zig"),
            .action = "show",
        },
        .routes = &[_]mantle.routing.Route{},
        .assets = &[_]type{@import("assets")},
    },
    .Session = struct {
        csrf_token: mantle.CsrfToken = .{},

        pub const key = "LuckyDog";
    },
    .migrations = &[_]type{},
    .tasks = &[_]type{},
    .controller_helpers = @import("controller_helpers.zig"),
});

pub fn init(allocator: std.mem.Allocator, env_map: *const std.process.EnvMap) !App {
    return try App.init(
        allocator,
        comptime switch (environment_options.environment) {
            .development => @import("environment/development.zig").config,
            .production => try @import("environment/production.zig").buildConfig(allocator, env_map),
        },
    );
}
