---
language: english
title: Test Code
date: "2000-06-12T16:51:00.000Z"
layout: post
draft: true
path: "test-code"
category: "software"
description: "Test code"
---

Here is code for `class`:

```javascript
const x = "hehe"

var _self = (typeof window !== 'undefined') 
	// highlight-start
	? window   // if in browser 
	: (
	// highlight-end
		(typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope)
		? self // if in worker
		: {}   // if in node js 
	);
```

```scala
val x = "hee"  // highlight-line

val y = x

// highlight-start
xx
yy
// highlight-end
```

```python
x = "hehe"
```

```sql
SELECT 1 FROM my_table;
```

```
this is
just text
```