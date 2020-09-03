/**
 * -----------------------------------------------------
 * DISCLAIMER ON FILE TYPE USED HERE
 * -----------------------------------------------------
 *
 * We are only using the .JS version of an ESLint config file here so that we can
 * add lots of comments to better explain and document the setup.
 *
 * Using JSON in your own projects would be preferable because it can be statically
 * analyzed and therefore we can provide automated migrations as linting best practices
 * evolve over time.
 */
module.exports = {
  /**
   * -----------------------------------------------------
   * NOTES ON CONFIGURATION STRUCTURE
   * -----------------------------------------------------
   *
   * Out of the box, ESLint does not support TypeScript or HTML. Naturally those are the two
   * main file types we care about in Angular projects, so we have to do a little extra work
   * to configure ESLint exactly how we need to.
   *
   * Fortunately, ESLint gives us an "overrides" configuration option which allows us to set
   * different lint tooling (parser, plugins, rules etc) for different file types, which is
   * critical because our .ts files require a different parser and different rules to our
   * .html (and our inline Component) templates.
   */
  overrides: [
    /**
     * -----------------------------------------------------
     * TYPESCRIPT FILES (COMPONENTS, SERVICES ETC) (.ts)
     * -----------------------------------------------------
     */
    {
      files: ['*.ts'],
      /**
       * We use a dedicated tsconfig file for the compilation related to linting so that we
       * have complete control over what gets included and we can maximize performance
       */
      parserOptions: {
        project: './tsconfig.eslint.json',
      },
      /**
       * See packages/eslint-plugin/src/configs/README.md
       * for what this recommended config contains.
       */
      extends: ['plugin:@angular-eslint/recommended'],
      rules: {
        /**
         * Any TypeScript related rules you wish to use/reconfigure over and above the
         * recommended set provided by the @angular-eslint project would go here.
         *
         * There are some examples below from the multiple plugins and ESLint core:
         */

        // ORIGINAL tslint.json -> "directive-selector": [true, "attribute", "app", "camelCase"],
        '@angular-eslint/directive-selector': [
          'error',
          { type: 'attribute', prefix: 'app', style: 'camelCase' },
        ],

        // ORIGINAL tslint.json -> "component-selector": [true, "element", "app", "kebab-case"],
        '@angular-eslint/component-selector': [
          'error',
          { type: 'element', prefix: 'app', style: 'kebab-case' },
        ],

        quotes: ['error', 'single', { allowTemplateLiterals: true }],

        '@typescript-eslint/no-misused-promises': ['error'],
      },
    },

    /**
     * -----------------------------------------------------
     * COMPONENT TEMPLATES
     * -----------------------------------------------------
     *
     * If you use inline templates, make sure you read the notes on the configuration
     * object after this one to understand how they relate to this configuration directly
     * below.
     */
    {
      files: ['*.component.html'],
      /**
       * See packages/eslint-plugin-template/src/configs/README.md
       * for what this recommended config contains.
       */
      extends: ['plugin:@angular-eslint/template/recommended'],
      rules: {
        /**
         * Any template/HTML related rules you wish to use/reconfigure over and above the
         * recommended set provided by the @angular-eslint project would go here.
         *
         * There is an example below from ESLint core (note, this specific example is not
         * necessarily recommended for all projects):
         */
        'max-len': ['error', { code: 140 }],
      },
    },

    /**
     * -----------------------------------------------------
     * EXTRACT INLINE TEMPLATES (from within .component.ts)
     * -----------------------------------------------------
     *
     * This extra piece of configuration is necessary to extract inline
     * templates from within Component metadata, e.g.:
     *
     * @Component({
     *  template: `<h1>Hello, World!</h1>`
     * })
     * ...
     *
     * It works by extracting the template part of the file and treating it as
     * if it were a full .html file, and it will therefore match the configuration
     * specific for *.component.html above when it comes to actual rules etc.
     *
     * NOTE: This processor will skip a lot of work when it runs if you don't use
     * inline templates in your projects currently, so there is no great benefit
     * in removing it, but you can if you want to.
     *
     * You won't specify any rules here. As noted above, the rules that are relevant
     * to inline templates are the same as the ones defined for *.component.html.
     */
    {
      files: ['*.component.ts'],
      extends: ['plugin:@angular-eslint/template/process-inline-templates'],
    },
  ],
};
