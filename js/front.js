const Typewriter = function (txtElement, words, wait=3000) {
    this.txtElement = txtElement;
    this.words = words;
    this.wait = parseInt(wait, 10);
    this.wordIndex = 0;
    this.txt = '';
    this.isDeleting = false;
    this.type();
};

//type method
Typewriter.prototype.type = function (){
    //cucrrent index of word
    const current = this.wordIndex % this.words.length;

    const fullTxt = this.words[current];

    //check if deleting
    if(this.isDeleting){
        // remove char
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    }else {
        //add char
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }
    //insert txt into element
    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

    //initial type speed
    let typeSpeed = 150;
    if(this.isDeleting) {
        typeSpeed /= 2;
    }
    //if word is complete 
    if (!this.isDeleting && this.txt===fullTxt){
        typeSpeed = this.wait;
        //set delete to true
        this.isDeleting = true ;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.wordIndex++;
        //pause before start typing 
        typeSpeed = 250;
    }

    setTimeout( () => this.type(), typeSpeed);
}

//init on dom load
document.addEventListener('DOMContentLoaded', init);

//init app
function init(){
    const txtElement = document.querySelector('.txt-type');
    const words = [
        "an enthusiastic developer", 
        "a quirky designer", 
        "a lover of mathematics"
    ];
    const wait = 3000;
    new Typewriter (txtElement, words, wait);
}