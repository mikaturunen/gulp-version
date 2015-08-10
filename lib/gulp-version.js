var through = require("through2");
var gutil = require("gulp-util");
var PluginError = gutil.PluginError;
var unifiedJson;

const PLUGIN_NAME = "gulp-version";

function unifyBowerJson(bowerJson, unifiedJson) {
    var stream = through();
    stream.write(prefixText);
    return stream;
}

function unifyPackageJson(packageJson, unifiedJson) {

}

function handleStream(file, cb) {
    if (file.history[0].indexOf("bower.json") !== -1) {
        var streamer = prefixStream(prefixText);
        streamer.on("error", this.emit.bind(this, "error"));
        file.contents = file.contents.pipe(streamer);
        this.push(file);
    } else if (file.history[0].indexOf("package.json") !== -1) {
        console.log(2);
        this.push(file);
    }

    cb();
}

function gulpVersion(unifiedVersionJson) {
    if (!unifiedVersionJson) {
        throw new PluginError(PLUGIN_NAME, "No unified settings/description json file provided.");
    }

    // we could open a stream but man I'm feeling too lazy for it now. I just need the funcitonality.
    // TODO refactor the ever-living daylights out of this
    try {
        unifiedJson = require(unifiedVersionJson);
    } catch (error) {
        throw new PluginError(PLUGIN_NAME, "Cannot 'require' " +
            unifiedVersionJson + ", make sure it's full path to the json file.");
    }

    // creating a stream through which each file will pass
    var stream = through.obj(function(file, enc, cb) {
        // When file is null, return empty file
        if (file.isNull()) {
            return cb(null, file);
        }

        // Buffers are not supported for now
        if (file.isBuffer()) {
            this.emit("error", new PluginError(PLUGIN_NAME, "Streams only supported."))
            return cb();
        }

        // Handle stream
        if (file.isStream()) {
            return handleStream(file, cb);
        }

        // Something went horribly wrong, cool!
        this.emit("error", new PluginError(PLUGIN_NAME, "Something went horribly wrong."))
        cb();
    });

    return stream;
}

module.exports = gulpVersion;
