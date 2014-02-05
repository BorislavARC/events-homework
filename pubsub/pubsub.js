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
    var event = this.handlers[eventName];
    if(handler === undefined) {
        return;
    }
    if (event === undefined) {
        event = [];
    }
    if(event.indexOf(handler) > -1) {
        return;
    } else {
        return event.push(handler);
    }
};

/**
 * Функция отписки от события
 * @param  {string} eventName имя события
 * @param  {function} handler функция которая будет отписана
 * @return {function}         ссылка на handler
 */

PubSub.prototype.unsubscribe = function(eventName, handler) {
    var event = this.handlers[eventName];
    if(handler === undefined) {
        return;
    }
    if(this.handlers[eventName].indexOf(handler) > -1) {
        return event.splice(event.indexOf(handler), 1);
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

    function pubilshTo() {
        setTimeout(function(handler){
            handler(eventName, data);
        }, 1)
    }
    this.handlers[eventName].forEach(pubilshTo);
    return true;
};

/**
 * Функция отписывающая все функции от определённого события
 * @param  {string} eventName имя события
 * @return {bool}             удачен ли результат операции
 */

PubSub.prototype.off = function(eventName) {
    if (this.handlers[eventName] === undefined) {
        return false;
    } else {
        this.handlers[eventName] =  [];
        return true;
    }
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


Function.prototype.pubsub = new PubSub();

Function.prototype.subscribe = function(eventName) {
    return this.pubsub.subscribe(eventName, this);
};

Function.prototype.unsubscribe = function(eventName) {
    return this.pubsub.unsubscribe(eventName, this);
};

Function.prototype.publish = function(eventName) {
    return this.pubsub.publish(eventName, this);
};

Function.prototype.off = function(eventName) {
    return this.pubsub.off(eventName, this);
};


function foo(event, data) {
    //body…
}

foo.subscribe('click');

foo.unsubscribe('click');
