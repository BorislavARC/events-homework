
function PubSub(){
    this.handlers = {};
}


PubSub.prototype.subscribe = function(eventName, handler) {
    if(handler === undefined) {
        alert('Не ввели функцию, которая будет вызвана при возникновении события');
        return false;
    }
    if (this.handlers[eventName] === undefined) {
        this.handlers[eventName] = [];
    }
    for (var b = 0; b < this.handlers[eventName].length; b++) {
        if (this.handlers[eventName][b] === handler) {
            alert('Уже есть такая функция в этом событии');
            return false;
        }
    }

    return this.handlers[eventName].push(handler);
};


PubSub.prototype.unsubscribe = function(eventName, handler) {
    if(handler === undefined) {
        alert('Не ввели функцию, которая будет отписана');
        return false;
    }
    for (var i = 0; i < this.handlers[eventName].length; i++) {
        if (this.handlers[eventName][i] === handler) {
            console.log('Функция отписана');
            return this.handlers[eventName].splice(i, 1);
        }
    }
};


PubSub.prototype.publish = function(eventName, data) {
    if (this.handlers[eventName] === undefined) {
        return false;
    }

    for (var i = 0; i < this.handlers[eventName].length; i++) {
        this.handlers[eventName][i](arguments[i+1]);
    }
    return true;
};


PubSub.prototype.off = function(eventName) {
    this.handlers[eventName] =  [];
    return true;

};


/*
    Дополнительный вариант — без явного использования глобального объекта
    нужно заставить работать методы верно у любой функции
 */


Function.prototype.handlers = {};

Function.prototype.subscribe = function(eventName) {
    if (Function.prototype.handlers[eventName] === undefined) {
        Function.prototype.handlers[eventName] = [];
    }
    return Function.handlers[eventName].push(this);
};

Function.prototype.unsubscribe = function(eventName) {
    if (Function.prototype.handlers[eventName] !== undefined)
        Function.prototype.handlers[eventName].splice(Function.prototype.handlers[eventName].indexOf(this),1);
    return true;
};


function foo(event, data) {
    //body…
}

foo.subscribe('click');

foo.unsubscribe('click');
