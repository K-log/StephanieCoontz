# Instructions for setup

**Note:** These instructions may not work for all cases. Please read through them thoroughly before preceding with setup.

**Note:** There are two different ways to setup the site. The first requires there be a database dump available on gitlab. The second requires performing the migration by hand using drush.

# Installing from a database dump (Recommended)

## Step 1: Getting the source

1. Make sure you have the most recent version of [Drupal 8](https://www.drupal.org/8) setup. Either on Acquia DevDesktop, Lando, or some other dev stack.

2. Clone the SQL dump files, and the theme from the sources below:

     - Clone the SQL dump from the SQL-Dump branch: [Gitlab](http://git.evergreen.edu/coontz)

      - Clone the theme from the development branch: [Github](http://www.github.com/k-log/StephanieCoontz-Theme)


**Note:** Due to Github being publicly available, the database dump file is being stored on [Gitlab](http://git.evergreen.edu/coontz) and the actual theme along with these instructions are stored on [Github](http://www.github.com/k-log/StephanieCoontz-Theme).


## Step 2: Setup with A SQL dump file

Once you have made sure your site and database are up and running, perform the following database import:

Using drush, navigate to your installation of Drupal 8 and run the following commands.

**Note:** Make sure to change the path to the SQL dump file before running the command. 

```bash
drush sql-drop
drush sql-cli < /PATH/TO/coontz-sql-dump-DATE.sql
```

## Step 3: Setup the theme

Move the `StephanieCoontz-Theme` directory to the theme directory of your Drupal installation and run the following commands:

**Note:** Make sure to have the most recent version of node installed on your system.

```bash
npm install
sh comp.sh
```

Running `comp.sh` should compile the sass source files and run a `drush cr` so when you navigate to your site you should see it updated with the theme.




---

# Installing from a CSV Migration

## Step 1: Installing Prerequisites

### The following three modules are used to import from a CSV format and provide the command line tools relevant to the migration.
Choose the newest stable version that matches your Drupal version.

[Migrate Source CSV](https://www.drupal.org/project/migrate_source_csv)

[Migrate Plus](https://www.drupal.org/project/migrate_plus)

[Migrate Tool](https://www.drupal.org/project/migrate_tools)

Now enable all the modules **AND** Drupal core's included migrate module.

### Installing Drush
**Note:** The migration has only be tested with Drush 8 as of the current version of this file.

If you do not already have a version of Drush 8 on the machine hosting your Drupal website, you can get one by running the following command:

```composer require drush/drush:8.x```

In our case, we needed to run Drush using the following command:

```vendor/bin/drush```

**Note:** This may not be the case for everyone.

## Step 2: Configuring the migration

Navigate to the following url. It should come directly after your base site url:

```/admin/config/development/configuration/single/import```

Once there, go to the single import tab and past in the following YAML config:

```
langcode: en
status: true
dependencies: {  }
id: article_import
class: null
field_plugin_method: null
cck_plugin_method: null
migration_tags:
  - CSV
migration_group: null
label: 'Import articles'
source:
  plugin: csv
  path: 'full/path/to/articles.csv'
  delimiter: ','
  enclosure: '"'
  header_row_count: 1
  keys:
    - id
  column_names:
    -
      id: 'Unique Id'
    -
      title: Title
    -
      author: Author
    -
      date: Date
    -
      publication: Publication
    -
      body: 'Article body'
process:
  type:
    plugin: default_value
    default_value: article
  title: title
  field_author: author
  field_date: date
  field_publication: publication
  body/format:
    plugin: default_value
    default_value: full_html
  body/value: body
destination:
  plugin: 'entity:node'
migration_dependencies: null
```

**Note:** Make sure to fill in the path argument with the full path to your articles.csv file. It can be found [here](articles.csv)!

More information about the YAML config can be found here:

[CSV import config tutorial](https://www.mtech-llc.com/blog/lucas-hedding/migrating-using-csv)

## Step 3: Replacing the Article Content Type

In order for the migration to work, the Article content type needs to be replaced as that is the content type all the articles to be imported will be using and the configuration for all future articles on the site.

**Note:** Normally it is easier to simply delete the default Article content type and simply create a new one but it is possible to modify the existing one.

Use the specifications below for the new content type:

**Content Type Name: Article**

| Label       | Machine Name      | Field Type                         | Addition notes                                    |
| ----------- | ----------------- | ---------------------------------- | ------------------------------------------------- |
| Author      | field_author      | Text(plain)                        |                                                   |
| Body        | body              | Text(formatted, long, with summary |                                                   |
| Date        | field_date        | Date (Date only)                   | Make display format yyyy-mm-dd                    |
| Publication | field_publication | Text(plain)                        |                                                   |


## Step 4: Running the Migration

Now that everything is setup, all thats left to do is run the migration. Normally, running a `cache-rebuild` with Drush prior to this step is recommended. This can be done with `drush cr` or `vendor/bin/drush cr` if you have the same setup as us.

Run the migration from a terminal in the root of the site:

```drush migrate-import article_import```

A success message should be printed to the terminal with the number of succeeded migrations. 

**Note:** If you get an error, you can run `drush migrate-rollback --articles_import` to undo the failed migration. 


## Troubleshooting

In most cases, errors occur when a path is wrong or the instructions are not followed in the correct order.

If the migration still fails, feel free to submit an issue to the repository on github or contact one of the project developers.

The SQL import has not been tested and thus little help can be given for it although feel free to still submit an issue or contact a developer for help.

