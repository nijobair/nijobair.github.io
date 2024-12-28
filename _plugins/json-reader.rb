require 'json'

# Define a module named Jekyll
module Jekyll
  # Define a class JsonReaderGenerator that inherits from Jekyll::Generator
  class JsonReaderGenerator < Generator
    # Mark this generator as safe, so it can be executed without security concerns
    safe true

    # Define the generate method, which will be called to generate content for the site
    def generate(site)
      # Define the path to the directory containing the JSON files
      challenges_path = File.join(site.source, 'my_collection/sqlPlayground/challenges')
      # Initialize an empty array to store the parsed JSON data
      challenges = []

      # Iterate over each JSON file in the specified directory
      Dir.glob(File.join(challenges_path, '*.json')).each do |file|
        # Read and parse the JSON file, storing the data in the challenges array
        data = JSON.parse(File.read(file))
        challenges << data
      end

      # Add the parsed challenges data to the site configuration
      site.config['challenges'] = challenges
    end
  end
end