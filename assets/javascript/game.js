

class character
{
    constructor(inStartingHealth,inAttack,inDef,inID,inName)
    {
        this.charCurHealth = inStartingHealth;
        this.charBaseAtk = inAttack;
        this.charAtk = inAttack;
        this.charDef = inDef;
        this.charIndex = inID;
        this.charName = inName;
        this.charLiving = true;
    }

    Combat(Defender)
    {
        //have the defender attacked by the character
        Defender.charCurHealth -= this.charAtk;
        //have the attackers attack double.
        this.charAtk += this.charBaseAtk;
        this.charCurHealth -= Defender.charDef;
    }
}

var selectedHero;
var currentEnemy;
var heroesList = [];

function initGame()
{
    heroesList.push(new character(1,2,3,0)); //Chewie
    heroesList.push(new character(1,2,3,1)); //BB8
    heroesList.push(new character(1,2,3,2)); //Ewok
    heroesList.push(new character(1,2,3,3)); //Porg

    selectedHero = -1;
    currentEnemy = -1;
}

//we want to move an enemy down in order to be able to fight it.
function selectEnemy(enemy)
{
    //set the enemy id to the identifier of the new enemy
    currentEnemy = enemy;
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

});




function HandlePlayerClick(index)
{
    //if we've selected both our hero and our enemy, then we should only be clicking on the current enemy
    if(selectedHero >= 0 && currentEnemy >= 0)
    {
        //if we are not selecting the current enemy then we should do anything about the click
        if(index !== currentEnemy)
        {
            return;
        }
    }

    if(selectedHero === -1)
    {
        //we have not selected a hero. the person we've selected is our hero.
        selectedHero = index;
        //any functionality that we need to change for when a hero is selected.
        return;
    }

    //we've already selected the hero.
    if(currentEnemy === -1)
    {
        //we need to select the current enemy.
        selectEnemy(index);
    }



}

window.onload
{
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





