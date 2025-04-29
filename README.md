
## Goban libraries
- eidogo
- goban by online-go.com
  - goban repo: https://github.com/online-go/goban
  - online-go website using it: https://github.com/online-go/online-go.com
- ghostban - goproblems.com 's fancy new goban
  - https://github.com/goproblems/ghostban
- WGo.js - used by deepmind for alphago teach
  - https://alphagoteach.deepmind.com/
  - https://wgo.waltheri.net/player
  - https://wgo.waltheri.net/tutorials/board
  - https://github.com/waltheri/wgo.js
- Besogo - used by tsumegohero
- Shudan - used by Sabaki
  - https://github.com/SabakiHQ/Shudan/tree/master
  - https://github.com/SabakiHQ/Shudan/blob/master/docs/README.md
  - Seems to have straight-forward support for ReactJS

- wtf is this? - by the guy that made the new goban for goproblems.com - TODO: need to try running this
  - https://github.com/ghost-go/ghost-go-legacy/tree/main


## Tsumego websites
- goproblems.com
  - almost definitely has an API
- tsumego-hero
  - has tags
  - there's a "download SGF" button when you log in
- "go magic"
- 101weiqi
- aren't there github repos of SGF collections out there?










## How to run and how to build...


ReactJS hot reloading:
```
npm run dev
```




build static HTML/JS:
```
npm run build

# output is /dist, and can be run from that folder with the following:
python -m http.server
```






## How I spun up the project...

```
npm create vite@latest ghostban-app -- --template react

npm install react-router-dom
npm install bootstrap@5.3.5

npm install -D typescript @types/react @types/react-dom
npm install vite-tsconfig-paths
# lots of fiddling with files around here
```






