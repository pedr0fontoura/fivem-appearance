fx_version "cerulean"
game { "gta5" }

author 'snakewiz'
description 'A flexible player customization script for FiveM.'
repository 'https://github.com/pedr0fontoura/fivem-appearance'
version '1.3.0-enhanced-patch1'
-- Patched: NUI callback registration (He.loadModule()) now runs before the
-- synchronous tattoos.json/peds.json parsing in game/dist/index.js, instead
-- of after it. This closes a startup race where the UI's first NUI fetch
-- (appearance_get_locales) could 404 because the client script hadn't
-- registered its callback types yet. Unrelated to Alchemist asset conversion.

client_script 'game/dist/index.js'

files {
  'web/dist/index.html',
  'web/dist/assets/*.js',
  'locales/*.json',
  'peds.json',
  'tattoos.json'
}

ui_page 'web/dist/index.html'