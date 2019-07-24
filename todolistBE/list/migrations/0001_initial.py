# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Todo',
            fields=[
                ('todo_id', models.AutoField(serialize=False, primary_key=True)),
                ('text', models.TextField()),
                ('expire_date', models.TextField()),
                ('priority', models.IntegerField()),
                ('state', models.TextField()),
            ],
        ),
    ]
