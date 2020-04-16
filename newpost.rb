#!/usr/bin/env ruby

require 'date'

if ARGV.count == 0 then
    puts "Invoke:"
    puts "\t> #{__FILE__} \"Title of a post\""
    puts ""
    exit
end

title = ARGV.join(" ").strip.gsub(/[ ]+/, ' ')
title_slug = title.downcase.gsub('c#', 'csharp').gsub(/[^a-z0-9 ]/, '').gsub(/[ ]+/, '-')

now = DateTime.now()

file_name = now.strftime("%Y-%m-%d") + '-' + title_slug + '.markdown'
file_path = File.join(Dir.pwd, "_posts", file_name)

open(file_path, 'w') { |f|
  f.puts "---"
  f.puts "title: \"#{title}\""
  f.puts "date: #{now.strftime("%Y-%m-%d %H:%M:%S %z")}"
  f.puts "---"
  f.puts "Words go here."
}
