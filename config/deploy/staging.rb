set :stage, :staging

set :app_mode, 'staging'

server '134.213.153.219', user: 'root', roles: %w{web app}, port: 22
