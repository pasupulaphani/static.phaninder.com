set :stage, :production

server '134.213.153.219', user: 'root',  password: fetch(:password), roles: %w{web app}, port: 22
