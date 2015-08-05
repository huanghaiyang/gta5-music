$(document).ready(function() {
	var $z = $('.z'),
		$f1 = $('.f1'),
		$l1 = $('.l1'),
		$c1 = $('.c1'),
		$l2 = $('.l2'),
		$r = $('.r'),
		$l3 = $('.l3'),
		$c2 = $('.c2'),
		$l4 = $('.l4'),
		$c3 = $('.c3'),
		$c4 = $('.c4'),
		$k = $('.k'),
		$k1 = $('.k1'),
		$s = $('.s'),
		$i1 = $('.i1'),
		$i2 = $('.i2'),
		$e1 = $('.e1'),
		$c1_1 = $('.c1-1'),
		$m = $('.m'),
		$n = $('.n');
	$f1.css({
		left: ($z.width() - $f1.width()) / 2,
		top: Math.sqrt(2 * Math.pow($f1.height() / 2, 2)) - $f1.height() / 2
	});
	$l1.css({
		left: ($z.width() - $l1.width()) / 2,
		top: Math.sqrt(2 * Math.pow($f1.height(), 2))
	});
	$c1.css({
		left: ($z.width() - $c1.width()) / 2,
		top: Math.sqrt(2 * Math.pow($f1.height(), 2)) + $l1.height()
	});
	$l2.css({
		left: ($z.width() - $l2.width()) / 2,
		top: Math.sqrt(2 * Math.pow($f1.height(), 2)) + $l1.height() + $c1.height()
	});
	$r.css({
		left: ($z.width() - $r.width()) / 2,
		top: Math.sqrt(2 * Math.pow($f1.height(), 2)) + $l1.height() + $c1.height() + $l2.height() + Math.sqrt(2 * Math.pow($r.height() / 2, 2)) - $r.height() / 2
	});
	$l3.css({
		left: ($z.width() - $l3.width()) / 2,
		top: Math.sqrt(2 * Math.pow($f1.height(), 2)) + $l1.height() + $c1.height() + $l2.height() + Math.sqrt(2 * Math.pow($r.height(), 2))
	});
	$c2.css({
		left: ($z.width() - $c2.width()) / 2,
		top: Math.sqrt(2 * Math.pow($f1.height(), 2)) + $l1.height() + $c1.height() + $l2.height() + Math.sqrt(2 * Math.pow($r.height(), 2)) + $l3.height()
	});
	$l4.css({
		left: ($z.width() - $l4.width()) / 2,
		top: Math.sqrt(2 * Math.pow($f1.height(), 2)) + $l1.height() + $c1.height() + $l2.height() + Math.sqrt(2 * Math.pow($r.height(), 2)) + $l3.height() + $c2.height()
	});
	$c3.css({
		left: ($z.width() - $c3.width()) / 2,
		top: Math.sqrt(2 * Math.pow($f1.height(), 2)) + $l1.height() + $c1.height() + $l2.height() + Math.sqrt(2 * Math.pow($r.height(), 2)) + $l3.height() + $c2.height() + $l4.height()
	});
	$c4.css({
		left: ($z.width() - $c4.width()) / 2,
		top: Math.sqrt(2 * Math.pow($f1.height(), 2)) + $l1.height() + $c1.height() + $l2.height() + Math.sqrt(2 * Math.pow($r.height(), 2)) + $l3.height() + $c2.height() + $l4.height() + $c3.height() - 4
	});
	$k.css({
		left: ($z.width() - $k.width()) / 2,
		top: Math.sqrt(2 * Math.pow($f1.height(), 2)) + $l1.height() + $c1.height() + $l2.height() + Math.sqrt(2 * Math.pow($r.height(), 2)) + $l3.height() + $c2.height() + $l4.height() + $c3.height() - 4 + $c4.height() - 4
	});
	$k1.css({
		left: ($z.width() - $k1.width()) / 2,
		top: Math.sqrt(2 * Math.pow($f1.height(), 2)) + $l1.height() + $c1.height() + $l2.height() + Math.sqrt(2 * Math.pow($r.height(), 2)) + $l3.height() + $c2.height() + $l4.height() + $c3.height() - 4 + $c4.height() - 4 + $k.height()
	});
	$s.css({
		left: ($z.width() - $k1.width()) / 2,
		top: Math.sqrt(2 * Math.pow($f1.height(), 2)) + $l1.height() + $c1.height() + $l2.height() + Math.sqrt(2 * Math.pow($r.height(), 2)) + $l3.height() + $c2.height() + $l4.height() + $c3.height() - 4 + $c4.height() - 4 + $k.height() + $k1.height()
	});

	$i1.css({
		left: ($z.width() - $i1.width()) / 2,
		top: Math.sqrt(2 * Math.pow($f1.height(), 2)) + $l1.height() + $c1.height() + $l2.height() + Math.sqrt(2 * Math.pow($r.height(), 2)) / 2 - $i1.height() / 2
	});
	$i2.css({
		left: ($z.width() - $i2.width()) / 2,
		top: Math.sqrt(2 * Math.pow($f1.height(), 2)) + $l1.height() + $c1.height() + $l2.height() + Math.sqrt(2 * Math.pow($r.height(), 2)) / 2 - $i2.height() / 2
	});
	$c1_1.css({
		left: ($z.width() - $c1_1.width()) / 2,
		top: Math.sqrt(2 * Math.pow($f1.height(), 2)) + $l1.height() + ($c1_1.height() - $c1.height()) / 2
	});
	$m.css({
		left: ($z.width() - $m.width()) / 2,
		top: Math.sqrt(2 * Math.pow($f1.height(), 2)) + $l1.height() + $c1.height() + $l2.height() + Math.sqrt(2 * Math.pow($m.height() / 2, 2)) - $m.height() / 2
	});
	$n.css({
		left: ($z.width() - $n.width()) / 2,
		top: Math.sqrt(2 * Math.pow($f1.height(), 2)) + $l1.height() + $c1.height() + $l2.height() + Math.sqrt(2 * Math.pow($n.height() / 2, 2)) - $n.height() / 2
	});
});