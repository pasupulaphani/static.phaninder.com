set :stage, :vm

set :app_mode, 'vm'

server '127.0.0.1', user: 'deploy', roles: %w{web app}, port: 2222
