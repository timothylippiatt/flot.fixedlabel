/*
The MIT License (MIT)

Copyright (c) 2015 Timothy Lippiatt

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

/*
jquery.flot.fixedlabel.js
-------------------------
A simple flot plugin to display a label at a fixed position within the flot chart.
*/

(function ($) {

    function init(plot) {
        
        plot.hooks.drawSeries.push(
            function (plot, ctx, series) {

                var fixedLabelOptions = plot.getOptions().fixedLabel;

                if (fixedLabelOptions != null &&
                    fixedLabelOptions.value != null &&
                    fixedLabelOptions.value.length > 0) {

                    // X value start point is on the left edge of the graph canvas
                    var x = series.yaxis.box.left + series.yaxis.box.width + fixedLabelOptions.x;

                    ctx.save();

                    if (fixedLabelOptions.font) {
                        ctx.font = fixedLabelOptions.font;
                    }

                    if (fixedLabelOptions.color) {
                        ctx.fillStyle = fixedLabelOptions.color;
                    }

                    ctx.fillText(fixedLabelOptions.value, x, fixedLabelOptions.y);

                    ctx.restore();
                }
            });
    }

    var options = {
        fixedLabel: {
            value: null,
            font: "10px sans-serif",
            color: "black",
            x: 0,
            y: 10 // Default so that text can be seen and is not above the canvas
        }
    }

    $.plot.plugins.push(
        {
            init: init,
            options: options,
            name: "fixedLabel",
            version: "0.2"
        }
    );

})(jQuery);