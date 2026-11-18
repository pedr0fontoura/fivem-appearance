fx_version "cerulean"
game { "gta5" }

author 'Snake'
description 'A flexible player customization script for FiveM.'
repository 'https://github.com/snakewiz/fivem-appearance'
version '1.2.0'
nui_callback_strict_mode 'false'

client_scripts { 
  
  'typescript/build/client.js',
  'client.lua'
  }

server_script 'server.lua'
  
 

files {
  'ui/build/index.html',
  'ui/build/static/js/*.js',
  'locales/*.json',
  'peds.json'
}

ui_page 'ui/build/index.html'
