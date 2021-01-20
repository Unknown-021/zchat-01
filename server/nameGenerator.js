function getRandomArbitrary(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
    
  exports.randomName = function (){
    var name = '';
    var arr1 = [
      'Бледный',
      'Странный',
      'Модный',
      'Веселый',
      'Начитанный',
      'Успешный',
      'Веселый',
      'Серьезный',
      'Элегантный',
      'Проворный',
      'Неистовый'
    ];
    
    var arr2 = [
      'Странник',
      'Прогер',
      'Маг',
      'Агент',
      'Орк',
      'Слон',
      'Ученый',
      'Гендальф',
      'Скайуокер',
      'Джеки Чан',
      'Филантроп'

    ];
    name = arr1[getRandomArbitrary(0,11)] + ' ' + arr2[getRandomArbitrary(0,11)];
    return name;
  }
