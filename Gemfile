source "https://rubygems.org"

#> bundle exec jekyll serve

gem "github-pages", group: :jekyll_plugins

# Windows and JRuby does not include zoneinfo files
install_if -> { RUBY_PLATFORM =~ %r!mingw|mswin|java! } do
  gem "tzinfo", "~> 1.2"
  gem "tzinfo-data"
end

# Performance-booster for watching directories on Windows
gem "wdm", "~> 0.1.1", :install_if => Gem.win_platform?

# Thank you, dependabot
gem "kramdown", ">= 2.3.1"
