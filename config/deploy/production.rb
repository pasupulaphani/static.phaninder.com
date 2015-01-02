set :stage, :production

set :app_mode, 'production'

server '134.213.153.219', user: 'root', roles: %w{web app}, port: 22
