const std = @import("std");

const assets = @import("assets");
const environment_options = @import("environment");
const mantle = @import("mantle");
pub const mantle_view_helpers = mantle.view_helpers;

pub fn writeImportMap(writer: *std.Io.Writer) !void {
    var import_map = mantle.ImportMap.init(writer);
    try import_map.begin();
    try import_map.writeEntries(assets.import_map_entries);
    switch (environment_options.environment) {
        .development => {
            try import_map.writeEntry(.init("react", "https://esm.sh/react@^19.1.1?dev"));
            try import_map.writeEntry(.init("react-dom", "https://esm.sh/react-dom@^19.1.1?dev"));
            try import_map.writeEntry(.init("react-dom/", "https://esm.sh/react-dom@^19.1.1&dev/"));
        },
        .production => {
            try import_map.writeEntry(.init("react", "https://esm.sh/react@^19.1.1"));
            try import_map.writeEntry(.init("react-dom", "https://esm.sh/react-dom@^19.1.1"));
            try import_map.writeEntry(.init("react-dom/", "https://esm.sh/react-dom@^19.1.1/"));
        },
    }
    try import_map.writeEntry(.init("camelize", "https://esm.sh/camelize@^1.0.1"));
    try import_map.writeEntry(.init("classnames", "https://esm.sh/classnames@^2.5.1"));
    try import_map.writeEntry(.init("htm", "https://esm.sh/*htm@^3.1.1"));
    try import_map.writeEntry(.init("htm/", "https://esm.sh/*htm@^3.1.1/"));
    try import_map.writeEntry(.init("lodash", "https://esm.sh/lodash@4.17.21"));
    try import_map.writeEntry(.init("lodash/", "https://esm.sh/lodash@4.17.21/"));
    try import_map.end();
}

pub const container_class = "bg-blue-100/70 dark:bg-blue-950/70 px-4 py-2 rounded-lg text-center";
pub const link_class = "text-purple-700 dark:text-purple-400 hover:underline";
