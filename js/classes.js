class Character {
    _life = 1
    maxLife = 1
    attack = 0
    defense = 0

    constructor(name) {
        this.name = name
    }

    get life() {
        return this._life
    }
    set life(newLife) {
        this._life = newLife < 0 ? 0 : newLife
    }

}
class BeginnerStudent extends Character {
    constructor(name) {
        super(name)
        this.life = 100
        this.attack = 10
        this.defense = 8
        this.maxLife = this.life
        this.quotes = [
            "Hora do show!",
            "Agora é a minha vez!",
            "Vou te ensinar a programar!",
            "Não subestime um iniciante!"
        ];
    }
}

class HtmlDev extends Character {
    constructor(name) {
        super(name)
        this.life = 80
        this.attack = 15
        this.defense = 3
        this.maxLife = this.life
        this.quotes = [
            "HTML é a minha especialidade!",
            "Se precisar de uma tag, é só chamar!",
            "Vou fazer uma página incrível!",
            "Vou deixar o código mais semântico!"
        ];
    }
}

class Mega_Boss extends Character {
    constructor() {
        super('Filipe deschamps')
        this.life = 120
        this.attack = 15
        this.defense = 5
        this.maxLife = this.life
        this.quotes = [
            "Delicinha",
            "Olha só que massa!",
            "Pare de usar IFS!",
            "Vou acabar com a tua produtividade!"
        ];
    }
}

class Ultra_Boss extends Character {
    constructor() {
        super('Fábio Akita')
        this.life = 120
        this.attack = 15
        this.defense = 5
        this.maxLife = this.life
        this.quotes = [
            "Só sei que nada sei",
            "Vou te dar uma palestra sobre programação!",
            "Sua linguagem não é especial!",
            "Você ultrapassou o auge da alucinação!"
        ];
    }
}

class Stage {
    constructor(fighter1, fighter2, fighter1El, fighter2El, logObject) {
        this.fighter1 = fighter1;
        this.fighter2 = fighter2;
        this.fighter1El = fighter1El;
        this.fighter2El = fighter2El;
        this.log = logObject;
    }

    start() {
        setInterval(() => {
            this.update();
        }, 100);

        this.fighter1El.querySelector(".attackButton").addEventListener("click", () =>
            this.doAttack(this.fighter1, this.fighter2)
        );
        this.fighter2El.querySelector(".attackButton").addEventListener("click", () =>
            this.doAttack(this.fighter2, this.fighter1)
        );
    }

    update() {
        this.fighter1El.querySelector(".name").innerHTML = `${this.fighter1.name} - ${this.fighter1.life.toFixed(2)} HP`;
        let f1Pct = (this.fighter1.life / this.fighter1.maxLife) * 100;
        this.fighter1El.querySelector(".bar").style.width = `${f1Pct}%`;
        this.updateLifeBar(this.fighter1, this.fighter1El);
    
        this.fighter2El.querySelector(".name").innerHTML = `${this.fighter2.name} - ${this.fighter2.life.toFixed(2)} HP`;
        let f2Pct = (this.fighter2.life / this.fighter2.maxLife) * 100;
        this.fighter2El.querySelector(".bar").style.width = `${f2Pct}%`;
        this.updateLifeBar(this.fighter2, this.fighter2El);
    }
    updateLifeBar(fighter, fighterEl) {
        const lifeBarEl = fighterEl.querySelector(".lifebar");
        const barEl = fighterEl.querySelector(".bar");

        const percentage = (fighter.life / fighter.maxLife) * 100;

        if (percentage > 80) {
            barEl.style.backgroundColor = "green";
        } else if (percentage > 60) {
            barEl.style.backgroundColor = "yellowgreen";
        } else if (percentage > 50) {
            barEl.style.backgroundColor = "yellow";
        } else if (percentage > 30) {
            barEl.style.backgroundColor = "orange";
        } else {
            barEl.style.backgroundColor = "red";
        }
        barEl.style.width = percentage + "%";
        lifeBarEl.dataset.value = `${fighter.life} / ${fighter.maxLife}`;
    }
    speakRandomPhrase(attacking, attacked) {
        let attackerPhrase = attacking.phrases[Math.floor(Math.random() * attacking.phrases.length)];
        let attackedPhrase = attacked.phrases[Math.floor(Math.random() * attacked.phrases.length)];
        this.log.addMessage(`${attacking.name}: ${attackerPhrase}`);
        this.log.addMessage(`${attacked.name}: ${attackedPhrase}`);
    }

    doAttack(attacking, attacked) {

        if (attacking.life <= 0 || attacked.life <= 0) {
            this.log.addMessage("Chutando cachorro morto!");
            return;
        }

        let attackFactor = (Math.random() * 2).toFixed(2);
        let defenseFactor = (Math.random() * 2).toFixed(2);

        let actualAttack = attacking.attack * attackFactor;
        let actualDefense = attacked.defense * defenseFactor;

        if (actualAttack > actualDefense) {
            attacked.life -= actualAttack;
            let quote = attacking.quotes[Math.floor(Math.random() * attacking.quotes.length)];
            this.log.addMessage(`${attacking.name}: ${quote} (${actualAttack.toFixed(2)} de dano)`)
        } else {
            this.log.addMessage(`${attacking.name} atacou mas ${attacked.name} conseguiu escapar do golpe...`);

            this.update();
        }
    }
}

class Log {
    list = [];

    constructor(listEl) {
        this.listEl = listEl;
    }

    addMessage(msg) {
        this.list.push(msg);
        this.render();
    }
    render() {
        this.listEl.innerHTML = '';
        for (let i in this.list) {
            this.listEl.innerHTML += `<li>${this.list[i]}</li>`
        }
    }
}