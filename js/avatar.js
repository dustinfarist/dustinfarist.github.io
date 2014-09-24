// Point Class
var Point = function (x, y) {
    this.x = x || 0;
    this.y = y || 0;
};

Point.prototype.toString = function () {
    return this.x + "," + this.y;
};

Point.prototype.toIdString = function () {
    return this.x + "_" + this.y;
};

Point.prototype.asIndex = function () {
    return this.x + Math.ceil(this.y * 16);
};

Point.createFromIndex = function (index) {
    var x, y;

    x = index % 16;
    y = Math.floor(index / 16);

    return new Point(x, y);
};

var Cartesian = (function (window, undefined) {
    var cartesian = {};

    /// Summary:
    /// Cartesian.square(setA, setB) returns the set of all possible ordered tuples of two sets.
    ///
    /// Signature:
    /// [a] -> [a] -> [a]
    ///
    /// Syntax:
    /// square([A], [B])
    ///
    /// Examples:
    /// square([1, 2], [5, 6])
    /// => [[1, 5], [1, 6], [2, 5], [2, 6]]
    cartesian.square = function (setA, setB) {
        var result;

        // Ensure we're dealing with arrays
        setA = [].concat(setA);
        setB = [].concat(setB);

        result = setA.map(function (a) {
            return setB.map(function (b) {
                return a.concat(b);
            });
        });

        // `result` will look like: `[[[1, 3], [1, 4]], [[2, 3], [2, 4]]]`
        // Use `concat.apply()` to flatten the inner arrays.
        // This is equivalent to `[].concat(result[0], result[1], ..., result[n])`
        return [].concat.apply([], result);
    };

    /// Summary:
    /// Cartesian.product(sets) returns the set of all possible ordered pairings of multiple sets.
    ///
    /// Signature:
    /// [[a]] -> [[a]]
    ///
    /// Syntax:
    /// product([[A], [B], ...])
    ///
    /// Examples:
    /// product([[1, 2], [5, 6], ["a", "b"]])
    /// => [[1, 5, "a"], [1, 5, "b"], [1, 6, "a"], [1, 6, "b"], [2, 5, "a"], ...]
    cartesian.product = function (sets) {
        return sets.reduce(Cartesian.square, [
            []
        ]);
    };

    return cartesian;
})(window || this);

Array.prototype.range = function (start, stop, step) {
    var result = [];
    for (var i = start; i < stop; i += step || 1) {
        result.push(i);
    }
    return result;
};

var colormapData = [{
    color: d3.rgb(255, 233, 200).toString(),
    matrix: [
        [
            [4, 11],
            [9, 10]
        ],
        [
            [5, 6, 7, 8, 9, 10],
            [3, 6, 7]
        ],
        [
            [6, 7, 8, 9],
            [2, 4, 10]
        ],
        [
            [7, 8],
            [1]
        ],
        [
            [6, 9],
            [11]
        ],
        [
            [8],
            [5]
        ]
    ]
},

{
    color: d3.rgb(226, 200, 146).toString(),
    matrix: [
        [
            [2, 13],
            [8]
        ],
        [
            [4, 11],
            [3, 4]
        ],
        [
            [5, 10],
            [2, 4, 5, 11]
        ],
        [
            [6, 7, 8, 9],
            [8, 9]
        ],
        [
            [6, 7, 9],
            [5]
        ],
        [
            [7, 8],
            [12]
        ]
    ]
},

{
    color: d3.rgb(192, 169, 121).toString(),
    matrix: [
        [
            [4, 11],
            [5, 6, 7]
        ],
        [
            [5, 10],
            [10]
        ]
    ]
},

{
    color: d3.rgb(152, 89, 65).toString(),
    matrix: [
        [
            [2, 13],
            [9]
        ],
        [
            [3, 12],
            [3, 5, 6]
        ],
        [
            [4, 11],
            [2, 8]
        ],
        [
            [5, 10],
            [1]
        ],
        [
            [7, 8],
            [0]
        ]
    ]
},

{
    color: d3.rgb(198, 143, 83).toString(),
    matrix: [
        [
            [2, 13],
            [7]
        ],
        [
            [3, 12],
            [4]
        ],
        [
            [6, 9],
            [1]
        ]
    ]
},

{
    color: d3.rgb(90, 50, 42).toString(),
    matrix: [
        [
            [1, 14],
            [7, 8]
        ],
        [
            [2, 13],
            [6]
        ],
        [
            [5, 10],
            [9]
        ]
    ]
},

{
    color: d3.rgb(31, 25, 30).toString(),
    matrix: [
        [
            [1, 14],
            [9]
        ],
        [
            [2, 13],
            [10]
        ],
        [
            [3, 12],
            [9, 11, 12]
        ],
        [
            [4, 7, 8, 11],
            [13]
        ],
        [
            [5, 10],
            [8, 14]
        ],
        [
            [6, 9],
            [12, 15]
        ]
    ]
},

{
    color: d3.rgb(49, 48, 58).toString(),
    matrix: [
        [
            [3, 12],
            [7, 10]
        ],
        [
            [4, 11],
            [11]
        ],
        [
            [6, 9],
            [14]
        ],
        [
            [7, 8],
            [15]
        ]
    ]
},

{
    color: d3.rgb(81, 71, 62).toString(),
    matrix: [
        [
            [3, 12],
            [8]
        ],
        [
            [5, 10],
            [12]
        ],
        [
            [7, 8],
            [11]
        ]
    ]
},

{
    color: d3.rgb(110, 100, 71).toString(),
    matrix: [
        [
            [4, 11],
            [12]
        ],
        [
            [5, 6, 9, 10],
            [13]
        ],
        [
            [7, 8],
            [14]
        ]
    ]
}];

var colormap = Array.apply(null, new Array(16)).map(function () {
    return Array.apply(null, new Array(16)).map("".valueOf, "none");
});

var colorData = colormapData.forEach(function (group) {
    var points = [].concat.apply([], group.matrix.map(Cartesian.product)).map(function (p) {
        return {
            "x": p[0],
                "y": p[1]
        };
    });

    points.forEach(function (point) {
        colormap[point.x][point.y] = group.color;
    });
});

var pixelWidth = 20;

var gridScale = d3.scale.ordinal()
    .domain([].range(0, 16))
    .rangePoints([0, pixelWidth * 15]);

var svg = d3.select("#avatar")
    .append("svg:svg")
    .attr("width", pixelWidth * 16)
    .attr("height", pixelWidth * 16);

svg.selectAll(".pixel")
    .data([].range(0, 256).map(Point.createFromIndex))
    .enter()
    .append("svg:rect")
    .classed("pixel", true)
    .attr("width", pixelWidth)
    .attr("height", pixelWidth)
    .attr("x", function (d) {
    return gridScale(d.x);
})
    .attr("y", function (d) {
    return gridScale(d.y);
})
    .attr("fill", function (d) {
    return colormap[d.x][d.y];
})
    .attr("opacity", 0)
    .transition()
    .duration(function (d) {
    return Math.random() * 1000;
})
    .attr("opacity", 1);
