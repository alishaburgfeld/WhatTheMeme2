What the Me^^e?!
A hilarious online card/meme game!

Description:

This is an online multiplayer game similar to Cards Against Humanity. Upon making an account players coin join or start a game. If they start a game they will get a code that they can email to their friends on their friend list. When all players are ready to play they will flip over the center meme card. This will be my first API (https://imgflip.com/api). Users will then draw 6 cards which are generated from my 2nd API (https://rapidapi.com/A-fandino/api/cards-against-humanity/). Users will pick a card that they think provides the funniest description for the center meme. Once all players have submitted a card the cards will be flipped face up and all players will vote on the funniest meme + caption combination. The owner of that card will receive a point. First player to 6 points wins.
*There is currently an asynchronous bug that is likely a 'race issue.' Upon changing rounds there will occasionally be a bug where a user does not have "select a card" buttons, however if the other player continues playing it will often reset the other players state and play can continue as normal. I'm currently working on moving more of my functions to the backend to decrease the time-separated calls to the backend which I hope will eliminate the issue.
