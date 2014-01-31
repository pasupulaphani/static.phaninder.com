def run_local(cmd)
  system cmd
  if($?.exitstatus != 0) then
    puts 'exit code: ' + $?.exitstatus.to_s
    exit
  end
end

namespace :grunt do
	task :build do
	  run_local("echo 'Starting Grunt build'")
	  run_local("grunt build")
	  run_local("echo 'Grunt build completed'")
	end
end

namespace :git do
	task :commit do
		run_local("echo 'Starting git task :commit............................................................'")
    # Check for any local changes that haven't been committed
    status = %x(git status --porcelain).chomp
   	puts "\nLocal git status : #{status}"

   	puts "\nChanges stagged"
   	status = %x(git add . )

		puts "\nCommitting local changes"
		puts "\nEnter commit message :"
		msg = STDIN.gets.chomp rescue nil
   	run_local("git commit -m '#{msg}'")
 
    # Check we are on the master branch, so we can't forget to merge before deploying
    branch = %x(git branch --no-color 2>/dev/null | sed -e '/^[^*]/d' -e 's/* \\(.*\\)/\\1/').chomp
    if branch != "master" && ENV["CHECK_BRANCH"]
      raise Capistrano::Error, "Not on master branch (set CHECK_BRANCH=0 to ignore)"
    end

    # Push the changes
    if ! system "git push #{fetch(:repository)} master"
      raise Capistrano::Error, "Failed to push changes to #{fetch(:repository)}"
    end
	end
end