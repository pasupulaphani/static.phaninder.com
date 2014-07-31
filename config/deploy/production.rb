set :stage, :production

server '178.62.31.145', user: 'root',  password: fetch(:password), roles: %w{web app}, port: 22
