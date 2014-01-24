set :stage, :production

server 'ec2-174-129-242-238.compute-1.amazonaws.com', user: 'deploy', roles: %w{web app}, port: 22
