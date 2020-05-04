'use strict';

let str = "One: 'Hi Mary.' Two: 'Oh, hi.'\n" +
    "One: 'How are you doing?'\n" +
    "Two: 'I'm doing alright. How about you?'\n" +
    "One: 'Not too bad. The weather is great isn't it?'\n" +
    "Two: 'Yes. It's absolutely beautiful today.'\n" +
    "One: 'I wish it was like this more frequently.'\n" +
    "Two: 'Me too.'\n" +
    "One: 'So where are you going now?'\n" +
    "Two: 'I'm going to meet a friend of mine at the department store'\n" +
    "One: 'Going to do a little shopping?'\n" +
    "Two: 'Yeah, I have to buy some presents for my parents.'\n" +
    "One: 'What's the occasion?'\n" +
    "Two: 'It's their anniversary.'\n" +
    "One: 'That's great. Well, you better get going. You don't want to be late.'\n" +
    "Two: 'I'll see you next time.'\n" +
    "One: 'Sure.' Bye.'";
let literal = /\'(?!m|s|ll|t)/;
let toReplace = "\"";
function replacer(str,literal,toReplace) {
    return console.log(str.replace(new RegExp(literal,'g'),toReplace));
}
replacer(str,literal,toReplace);


// простая валидация формы обратной связи

function validate() {
    let namePattern = /\S+[А-яа-я]/;
    let phonePattern = /^([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{2,6})$/;
    let emailPattern = /\S+@[a-z]+.[a-z]+/;
    document.getElementById('name').className = '';
    let name = document.forms['form'] ['name'].value;
    if (namePattern.test(name) === false) {
        document.getElementById('name').className = 'red';
        document.getElementById('error').className ='';
    } else console.log('name - PASS');
    let phone = document.forms['form'] ['phone'].value;
    if (phonePattern.test(phone) === false) {
        document.getElementById('phone').className = 'red';
        document.getElementById('error').className ='';
    } else console.log('phone -PASS');
    let email = document.forms['form'] ['email'].value;
    if (emailPattern.test(email) === false) {
        document.getElementById('email').className = 'red';
        document.getElementById('error').className ='';
    } else console.log('email - PASS');
}
document.querySelector('.submitButton').addEventListener('click', validate);