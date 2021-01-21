fx_version "cerulean"
game { "gta5" }

ui_page "nui/build/index.html"

files {
  "nui/build/index.html",
  "nui/build/static/js/*.js",
}

client_script "typescript/build/client.js"
server_script "typescript/build/server.js"