
exports.up = function(knex) {
  return knex.schema
    .createTable('projects', tbl => {
        tbl.increments('project_id');
        tbl.string('project_name', 128).notNullable();
        tbl.string('project_description', 128);
        tbl.boolean('project_completed').default(0);
    })
    .createTable('resources', tbl => {
        tbl.increments('resource_id');
        tbl.string('resource_name', 128)
            .notNullable()
            .unique();
        tbl.string('resource_description');
    })
    .createTable('tasks', tbl => {
        tbl.increments('task_id');
        tbl.string('task_description').notNullable();
        tbl.string('task_notes');
        tbl.boolean('task_completed').default(0);
        tbl.integer('project_id')
            .unsigned()
            .notNullable()
            .references('project_id')
            .inTable('projects')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
    })
    .createTable('project_resources', tbl => {
        tbl.increments('project_resource_id')

        tbl.integer('resource_id')
            .unsigned()
            .notNullable()
            .references('resource_id')
            .inTable('resources')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');

        tbl.integer('project_id')
            .unsigned()
            .notNullable()
            .references('project_id')
            .inTable('projects')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('project_resources')
    .dropTableIfExists('tasks')
    .dropTableIfExists('resources')
    .dropTableIfExists('projects')
};
