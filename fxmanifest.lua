fx_version "cerulean"
game { "gta5" }

ui_page "ui/build/index.html"

files {
  "ui/build/index.html",
  "ui/build/static/js/*.js",
}

client_script "typescript/build/client.js"
server_script "typescript/build/server.js"