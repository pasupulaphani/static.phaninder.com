set :stage, :staging

server '127.0.0.1', user: 'deploy', roles: %w{web app}, port: 2222
