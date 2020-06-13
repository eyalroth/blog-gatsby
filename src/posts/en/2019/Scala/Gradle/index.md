---
language: english
layout: post
demo: 'false'
date: '2019-12-03'
title: 'Gradle Scala Java'
path: 'gradle-scala-java'
category: 'articles-en'
tags:
  - Scala
  - Java
  - Gradle
  - Build
  - Project Setup
---

<!-- TODO title + path -->
<!-- TODO https://stackoverflow.com/questions/23409375/is-it-possible-to-use-gradle-to-develop-scala-projects -->


## basic setup

```txt
common/
dependencies/
gradle/
java-only/
mix-scala-java/
scala-only/
build.gradle
gradle.properties
settings.gradle
```

```groovy title=build.gradle
wrapper {
    gradleVersion = '6.0'
}

allprojects {
    apply from: new File(rootProject.projectDir, 'gradle/base.gradle')
    configureRepositories(project)
}
```

```groovy title=gradle/base.gradle
ext.applyFile = { name ->
    apply from: new File(rootProject.projectDir, "gradle/${name}.gradle")
}

ext.configureRepositories = { obj ->
    configure(obj) {
        repositories {
            jcenter()
        }
    }
}
```

```groovy title=settings.gradle
```

```groovy title=dependencies/dependencies.gradle
```

## gradle quick start

<!-- TODO  maybe just refer to online docs -->
```shell
gradle wrapper
./gradlew assemble
./gradlew build
./gradlew clean
./gradlew tasks

gradle --status
gradle --stop

./gradlew someTask -x otherTask
```

## sources

### java
### scala

```txt title=gradle.properties
scalaVersionMajor = 2.12
scalaVersionMinor = 6
```

## tests

```shell
./gradlew test
./gradlew test --tests *TestSuite
./gradlew cleanTest
```

### java
### scala
### test utils

### execution
- with junit
  - need to manually create an extra class per module
- with scalatest
  - not sure it works perfectly
  - separate reports in mixed projects
  - not fully compatible gradle testing
    - different filtering syntax for java and scala test
    - `cleanTest` doesn't clean reports
  - slightly more cumbersome execution from IntelliJ (don't delegate tests to gradle, which is the default)

## coverage

```shell
./gradlew coverage
./gradlew coverage -x compileScala
```

## publish

```shell
./gradlew artifactoryPublish
```

## application (fat jar)

```shell
./gradlew shadowDist
./gradlew shadowDistTar
./gradlew shadowDistZip
```

## build times

---

- intro
  - going to talk about
    - motivation
    - guide for a java-scala project using gradle
      - source code
      - java-scala interoperability
      - tests
      - coverage
      - publish jar + docs
      - application / fat jar
    - going over an example project
  - who is this for
    - pure scala devs
    - hybrid java-scala devs

- motivation
  - features / requirements
    - performance
    - dependency management
    - release, versioning
    - flexibility, extendability
    - readability
    - modularity
    - testing
      - fail fast
      - specific tests
    - IDE
    - docs
    - usability, CLI
    - complexity
    - polyglot
  - alternatives
    - maven (hybrid scala java)
      - TODO
    - sbt (pure scala)
      - TODO
  - links
    - <https://www.jetbrains.com/research/devecosystem-2018/scala/>
    - <https://engineering.linkedin.com/blog/2018/07/how-we-improved-build-time-by-400-percent>

- commands / cli examples
- example project
  - folder structure
  - modules structure
- gradle 5 vs 6