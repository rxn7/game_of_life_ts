export var Random;
(function (Random) {
    Random.range = (min, max) => Math.random() * (max - min) + min;
})(Random || (Random = {}));
