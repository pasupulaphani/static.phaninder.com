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
		run_local("echo 'Starting git............................................................'")
    # Check for any local changes that haven't been committed
    status = %x(git status --porcelain).chomp
   	puts "\nLocal git status : #{status}"

   	puts "\nChanges stagged"
   	status = %x(git add . )

		puts "Committing local changes"
		puts "Enter commit message \n"
		#set(:meg, Capistrano::CLI.ui.ask("Enter commit message: ") )
		ask :msg, proc {gets.chomp}
   	run_local("git commit -m #{:msg}")
 
    # Check we are on the master branch, so we can't forget to merge before deploying
    branch = %x(git branch --no-color 2>/dev/null | sed -e '/^[^*]/d' -e 's/* \\(.*\\)/\\1/').chomp
    if branch != "master" && !ENV["IGNORE_BRANCH"]
      raise Capistrano::Error, "Not on master branch (set IGNORE_BRANCH=1 to ignore)"
    end
	end
end