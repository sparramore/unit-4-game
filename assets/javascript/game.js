

class character
{
    constructor(inStartingHealth,inAttack,inDef,inID,inName,inPath)
    {
        this.charCurHealth = inStartingHealth;
        this.charBaseAtk = inAttack;
        this.charAtk = inAttack;
        this.charDef = inDef;
        this.charIndex = inID;
        this.charName = inName;
        this.charLiving = true;
        this.charPath = inPath;
        console.log(this);
    }

    Combat()
    {
        var attackDam = this.charAtk;
        //have the defender attacked by the character
        currentEnemy.charCurHealth -= this.charAtk;
        //have the attackers attack double.
        this.charAtk += this.charBaseAtk;
        this.charCurHealth -= currentEnemy.charDef;
        var defenseDam = currentEnemy.charDef;
        console.log("combat!")
        $("#instructions").text("You did: " + attackDam + "dam " + currentEnemy.charName + " did: " + currentEnemy.charDef + "dam");

    }
}


var selectedHero;
var currentEnemy;
var heroesList = [];
var song;



function playAudio() { 
    song.play(); 
 } 

function stopAudio() { 
    song.pause();
    song.currentTime = 0
}

function Rando(low,high)
{
   var difference = high - low;
   difference += 1;
   return Math.floor((Math.random() * difference) + low);
}

function initGame()
{
    heroesList = [];
    heroesList.push(new character(Rando(85,115),Rando(5,20),Rando(5,10),0,"Chewie","assets/images/baby-chewie.jpg")); //Chewie
    heroesList.push(new character(Rando(95,130),Rando(2,10),Rando(15,20),1,"BB8","assets/images/BB8.jpeg")); //BB8
    heroesList.push(new character(Rando(65,130),Rando(10,20),Rando(2,10),2,"Ewok","assets/images/ewok.jpg")); //Ewok
    heroesList.push(new character(Rando(100,120),Rando(5,15),Rando(5,15),3,"Porg","assets/images/star-wars-porg.jpg")); //Porg

    selectedHero = -1;
    currentEnemy = -1;
    for(var i = 0; i < heroesList.length;i++)
    {
        console.log("initing char " + i + " " + heroesList[i].charName + "-col")
        $("#" + heroesList[i].charName + "-col").append($("#" + heroesList[i].charName));
        $("#" + heroesList[i].charName + "-col").append($("#" + heroesList[i].charName + "-text"));
        $("#" + heroesList[i].charName).show();
        $("#" + heroesList[i].charName + "-text").show();
        $("#" + heroesList[i].charName).css("background-color","white");
        $("#" + heroesList[i].charName + "-text").text(heroesList[i].charName +": " + heroesList[i].charCurHealth);
    }
    $("#reset").hide();
    
    $("#instructions").text("Please Select Your Hero.");
}

function resolveCombat()
{
    if(currentEnemy == -1)
    {
        return;
    }
    console.log("Combat things happening!");
        //we are attacking the enemy.
    selectedHero.Combat();
    $("#" + selectedHero.charName + "-text").text(selectedHero.charName +": " + selectedHero.charCurHealth);
    $("#" + currentEnemy.charName + "-text").text(currentEnemy.charName +": " + currentEnemy.charCurHealth);
    if(selectedHero.charCurHealth <= 0)
    {
        //we have lost.
        $("#instructions").text("Game Over!");
        //we need to put up a reset button.
        $("#reset").show();
    }
    if(currentEnemy.charCurHealth <= 0)
    {
        //we have killed the enemy.
        $("#" + currentEnemy.charName).hide();
        $("#" + currentEnemy.charName + "-text").hide();
        heroesList[currentEnemy.charIndex].charLiving = false;
        currentEnemy = -1;
        $("#instructions").text("Please Select Another Opponent.");
        stopAudio();
    }
    var win = true;
    //check to see if all the enemies are dead.
    for(var i =0;i < heroesList.length;i++)
    {
        if(i !== selectedHero.charIndex)
        {
            if(heroesList[i].charLiving === true)
            {
                win = false;
            }
        }
    }

    if(win === true)
    {
        $("#instructions").text("Press Reset To Fight Again.");
        $("#reset").show();
    }
}

//we want to move an enemy down in order to be able to fight it.
function selectEnemy(enemy)
{
    //set the new enemy
    currentEnemy = heroesList[enemy];
}

$(document).ready(function() {

    $("#Chewie").on("click",function(){
        HandlePlayerClick(0);
    });

    $("#BB8").on("click",function(){
        HandlePlayerClick(1);
    });

    $("#Ewok").on("click",function(){
        HandlePlayerClick(2);
    });

    $("#Porg").on("click",function(){
        HandlePlayerClick(3);
    });

    $("#attack").on("click",function(){
        resolveCombat();
    });

    $("#reset").on("click",function(){
        initGame();
    });

    $("#reset").hide();

    $("#instructions").text("Please Select Your Hero.");

    initGame();
    
    song = new Audio('assets/audio/porg-wars.mp3');
});


function HandlePlayerClick(index)
{
    //if we've selected both our hero and our enemy, then we should only be clicking on the current enemy
    if(selectedHero !== -1 && currentEnemy !== -1)
    {
        //if we are not selecting the current enemy then we should do anything about the click
        if(index !== currentEnemy.charIndex)
        {
            console.log("clicked on something that was not the enemy.");
            return;
        }
    }

    if(selectedHero === -1)
    {
        console.log("selectedHero")
        //we have not selected a hero. the person we've selected is our hero.
        selectedHero = heroesList[index];
        //do something here to highlight that you are the hero.
        $("#" + selectedHero.charName).css("background-color","green");
        //turning our enemies red.
        for(var i = 0;i < heroesList.length;i++)
        {
            if(heroesList[i].charIndex != index)
            {
                $("#" + heroesList[i].charName).css("background-color","red");
            }
        }
        $("#instructions").text("Please Select Your Opponent.");
        //any functionality that we need to change for when a hero is selected.
        return;
    }

    //we've already selected the hero.
    if(currentEnemy === -1 && index !== selectedHero.charIndex)
    {
        //we need to select the current enemy.
        selectEnemy(index);
        //we are going to remove the enemy from the list of playable characters and put them in the arena
        $("#arena").append($("#" + currentEnemy.charName));
        $("#arena").append($("#" + currentEnemy.charName + "-text"));
        $("#" + currentEnemy.charName).css("background-color","black");
        $("#instructions").text("FIGHT!");
        playAudio();
        return;
    }

    resolveCombat();
}

window.onload
{
    console.log("onLoad");
    initGame();
}
//we need a function to change the state of a character to be dead.

//we need to put in functionality to respond to mouse messages on the playerChar class.

//we need functionality to be able to reset the game.

//if both the player and the enemy are selected, if we are not the enemy then we need to return
//if we don't have a player character, we need to set the player character to the hero.
//if we don't have an enemy, we need to set the player character to the current enemy and then run the select enemy function
//if we have set the current enemy then we need to run the combat function on the enemy.
//if we've run the combat function we need to determine the following
    //if the player was killed.
        //if the player was killed we need to tell the user they have lost.
        //then we need to reset everything back to normal.
    //if the enemy was killed
        //if the enemy was killed then we need to set the enemy to be dead.
        //we need to set up the functionality to make a new enemy selectable.





