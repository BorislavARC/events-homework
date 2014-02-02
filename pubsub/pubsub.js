/**
 * Конструктор класса обмена сообщениями
 * @constructor
 */

function PubSub(){
    this.handlers = {};
}

/**
 * Функция подписки на событие
 * @param  {string} eventName имя события
 * @param  {function} handler функция которая будет вызвана при возникновении события
 * @return {function}         ссылка на handler
 */

PubSub.prototype.subscribe = function(eventName, handler) {
    if(handler === undefined) {
        return;
    }
    if (this.handlers[eventName] === undefined) {
        this.handlers[eventName] = [];
    }
    if(this.handlers[eventName].indexOf(handler) > -1) {
        return;
    } else {
        return this.handlers[eventName].push(handler);
    }
};

/**
 * Функция отписки от события
 * @param  {string} eventName имя события
 * @param  {function} handler функция которая будет отписана
 * @return {function}         ссылка на handler
 */

PubSub.prototype.unsubscribe = function(eventName, handler) {
    if(handler === undefined) {
        return;
    }
    if(this.handlers[eventName].indexOf(handler) > -1) {
        return this.handlers[eventName].splice(this.handlers[eventName].indexOf(handler), 1);
    }
};

/**
 * Функция генерирующая событие
 * @param  {string} eventName имя события
 * @param  {object} data      данные для обработки соответствующими функциями
 * @return {bool}             удачен ли результат операции
 */

PubSub.prototype.publish = function(eventName, data) {
    if (this.handlers[eventName] === undefined) {
        return false;
    }

    function toPublic() {
        setTimeout(function(event){
        event(eventName, data);
        }, 1)
    }
    this.handlers[eventName].forEach(toPublic);
    return true;
};

/**
 * Функция отписывающая все функции от определённого события
 * @param  {string} eventName имя события
 * @return {bool}             удачен ли результат операции
 */

PubSub.prototype.off = function(eventName) {
    this.handlers[eventName] =  [];
    return true;

};


/**
 * @example
 *
 * PubSub.subscribe('click', function(event, data) { console.log(data) });
 * var second = PubSub.subscribe('click', function(event, data) { console.log(data) });
 *
 * //Отписать одну функцию от события 'click':
 * PubSub.unsubscribe('click', second);
 *
 * //Отписать группу функций от события 'click'
 * PubSub.off('click');
 */

/*
 Дополнительный вариант — без явного использования глобального объекта
 нужно заставить работать методы верно у любой функции
 */


Function.prototype.handlers = {};

Function.prototype.subscribe = function(eventName) {
    if(this === undefined) {
        return false;
    }
    if (Function.prototype.handlers[eventName] === undefined) {
        Function.prototype.handlers[eventName] = [];
    }
    return Function.handlers[eventName].push(this);
};


Function.prototype.unsubscribe = function(eventName) {
    if(handler === undefined) {
        return false;
    }
    if (Function.prototype.handlers[eventName] !== undefined) {
        Function.prototype.handlers[eventName].splice(Function.prototype.handlers[eventName].indexOf(this),1);
        return true;
    } else {
        return false
    }
};




function foo(event, data) {
    //body…
}

foo.subscribe('click');

foo.unsubscribe('click');
