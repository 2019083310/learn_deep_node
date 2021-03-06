#将联合查询到的数据转成对象(一对多)
SELECT product.id,product.title,product.price,
			JSON_OBJECT('id',brand.id,'name',brand.name,'website',brand.website) brand
FROM `product` LEFT JOIN `brand` ON brand.id=product.brand_id;

# 将查询到的多条数据，组织成对象，放入到一个数组中(多对多)
SELECT 
	stu.id, stu.name, stu.age,
	JSON_ARRAYAGG(JSON_OBJECT('id', cs.id, 'name', cs.name, 'price', cs.price))
FROM `students` stu
JOIN `students_select_courses` ssc ON stu.id = ssc.student_id
JOIN `courses` cs ON ssc.course_id = cs.id
GROUP BY stu.id;

SELECT * FROM products WHERE price > 6000;