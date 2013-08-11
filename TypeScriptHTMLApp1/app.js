var Greeter = (function () {
    function Greeter(element) {
        this.element = element;
        this.element.innerHTML += "The time is: ";
        this.span = document.createElement('span');
        this.element.appendChild(this.span);
        this.span.innerText = new Date().toUTCString();
    }
    Greeter.prototype.start = function () {
        var _this = this;
        this.timerToken = setInterval(function () {
            return _this.span.innerHTML = new Date().toUTCString();
        }, 500);
    };

    Greeter.prototype.stop = function () {
        clearTimeout(this.timerToken);
    };
    return Greeter;
})();

var Button = (function () {
    function Button(parent) {
        this.parent = parent;
        this.onClick = [];
        this.Draw();
    }

    Object.defineProperty(Button.prototype, "OnClick", {
        get: function () {
            return this.onClick;
        },
        set: function (value) {
            this.onClick.push(value);
            //  this.onClick = value;
        },
        enumerable: true,
        configurable: true
    });

    Button.prototype.Draw = function () {
        var _this = this;
        var vtn = document.createElement('div');
        vtn.innerText = 'sfsdfsdf';
        vtn.onclick = function () {
            if (_this.onClick !== undefined) {
                (function () {
                    _this.onClick();
                });
            }
        };
        this.parent.appendChild(vtn);
    };

    Button.prototype.ClickEventHandler = function () {
        alert('Yeahhhh');
    };
    return Button;
})();

var Collection = (function () {
    function Collection() {
        this.items = [];
    }
    Collection.prototype.Add = function (item) {
        this.items.push(item);
    };
    return Collection;
})();

function clickEventHandled() {
    alert('click!');
}

window.onload = function () {
    var el = document.getElementById('content');
    var greeter = new Greeter(el);
    greeter.start();

    var button = new Button(el);
    button.OnClick = button.ClickEventHandler();
};
//# sourceMappingURL=app.js.map
