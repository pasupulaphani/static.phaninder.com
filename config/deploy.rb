require_relative './mytasks'

# config valid only for Capistrano 3.1
lock '3.1'

set :default_env, { path: "/usr/local/bin:$PATH" }

set :application, 'static.phaninder.com'
set :repo_url, 'git@github.com:pasupulaphani/static.phaninder.com.git'

set :ssh_options, { 
  user: 'deploy',
  forward_agent: true
}
set :pty, true
set :use_sudo, true
set :password, ask('Server password:', nil)
set :deploy_to, '/var/www/static.phaninder.com'
set :branch, 'master'
set :scm, :git

set :format, :pretty
set :log_level, :debug

# Default value for linked_dirs is []
# set :linked_dirs, %w{bin log tmp/pids tmp/cache tmp/sockets vendor/bundle public/system}

set :keep_releases, 5


namespace :deploy do

  desc 'Restart nginx'
  task :restart do
  	on roles(:web), in: :groups, limit: 3, wait: 1 do
    	execute "sudo /etc/init.d/nginx stop"
    	execute "sudo /etc/init.d/nginx start"
    end
  end

  desc "Install node modules non-globally"
  task :npm_install do
    on roles(:web) do
      execute "cd #{current_path} && npm install"
    end
  end

  after :finishing, 'deploy:restart', 'deploy:cleanup'
  before :deploy, 'grunt:build'
  before :deploy, 'git:commit'
end
