module.exports = function (grunt) {
    grunt.initConfig({
        ts: {
            default: {
                tsconfig: './tsconfig.json',
                options: {
                    // Add an explicit file mapping for your TypeScript source files
                    fast: 'never',
                    files: [
                        {
                            src: ['src/**/*.tsx'], // Adjust the glob pattern to match your file structure
                            dest: 'dist', // Specify the destination directory for the compiled JavaScript files
                        },
                    ],
                },
            },
        },
    })

    grunt.loadNpmTasks('grunt-ts')

    grunt.registerTask('default', ['ts'])
}
