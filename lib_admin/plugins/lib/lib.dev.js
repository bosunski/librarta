	var generalKEY = '';
	var catKEY ='';
	var circKEY = '';
	var abspath = '';
	var dir = '';
	var successImg = '';
	var tips = '';
	$.getJSON('plugins/lib/getConf.php?data=getKeys', function(data) {
		generalKEY = data['general'];
		catKEY = data['cat'];
		circKEY = data['circ'];
		dir = data['dir'];
		successImg = '<img src="../lib_content/crt.png" alt="" />';
		tips = data['tips'];
	});
	 

	var target = $("#info");
	var totalBooks = 0;
	var totalBorrows = 0;
	var currentError = false;
	function showMain() {
		$("#ajaxContent").hide();
		$("#maincontent").show();
	}

	function hideMain() {
		$("#ajaxContent").show();
		$("#maincontent").hide();
	}

	function getSuccessText(text) {
		return '<div class="congrats"><center>'+successImg+'<h4>'+text+'</h4></center></div>';
	}

	/*@name renewTra
  	  @description : Renews a borrow;
	*/
	function renewTra(lib_no, acc_no) {
		if(confirm("Are you sure you want to renew this book?")) {
			var url = '../lib_ajax/dynamic_data.php?data=renewBook&lib_no='+lib_no+'&acc_no='+acc_no;
			$.get(url, function(info, status) {
				switch(info) {
					case 'done':
						createModal('Renewal Status', getSuccessText("Book Renewal Successful."), '');
					break;

					default:
						createModal('Error Status', info, 'error');
					break;
				}
			});
		}
	}

	/*@name delTra
  	  @description : Renews a borrow;
	*/
	function delTra(lib_no, acc_no) {
		if(confirm("Are you sure you want to Terminate this borrow?")) {
			var url = '../lib_ajax/dynamic_data.php?data=delTra&lib_no='+lib_no+'&acc_no='+acc_no;
			$.get(url, function(info, status) {
				switch(info) {
					case 'done':
						createModal('Cancel Transaction', getSuccessText("Done Successfully."), '');
					break;

					default:
						createModal('Error Status', "An Has Occured, Please try again.", 'error');
					break;
				}
			});
			return true;
		}
	}

	/*	@name refreshApp
  		@description : Updates the Page;
	*/
	function refreshApp() {
		//loadUsageChart();
		var refreshInterval = setInterval(function() {
			var url = '../lib_ajax/dynamic_data.php?data=getAll';
			$.getJSON(url, function(data) {
				var booklist = data['booksList'];

				/* Updates Admin list */
				updateAdmin(data['adminlist']);

				/* Updates Book list */
				updateBooks(data['booksList']);

				/* Updates Borrow list */
				updateBorrows(data['borrowsList']);
				
				updateOthers(data['otherData']);
			});
		}, 4000);
	}

	function startTipping(interval) {
		var html_tip = '';
		var each_tip = tips.split('||');
		//alert(tips);
		var num = 0;
		$.each(each_tip, function(i, field) {
			if(i == 1) {
				num = i;
				html_tip += '<h4 class="each-tip livet">'+field+'</h4>';
			} else if(i == num+1) {
				html_tip += '<h4 class="each-tip nextt" style="display:none;">'+field+'</h4>';
			} else {
				html_tip += '<h4 class="each-tip" style="display:none;">'+field+'</h4>';
			}
		});

		$(".lib-tips").append(html_tip);
		var showNextTip = setInterval(function() {
			var current = $(".livet");
			if(current.length == 0) {
				var next = $(".each-tip").first();
				next.show();
				next.addClass('livet');
				current.removeClass('livet');
				current.hide();
			} else {
				var next = current.next();
				next.show();
				next.addClass('livet');
				current.removeClass('livet');
				current.hide();
			}
		}, 10000);
	}

	/*	@name update_small_stats
  		@description : Updates the little stats above the page
	*/
	function update_small_stats(result) {
	}

	/*	@name set_crumb
  		@description : Updates the breadcrumb
	*/
	function set_crumb(text) {
		var target = $(".breadcrumb");
		$(".breadcrumb li:last-child").remove();
		target.append('<li class="active">'+text+'</li>');
	}


	/*	@name loaadBooks
  		@description : Load The 5 latest Books
	*/
	function loadBooks() {
		showLoader($("#lib_books .books-list"));
		$.getJSON('../lib_ajax/dynamic_data.php?data=books&limit=5', function(result) {
			setTimeout(function() {
					updateBooks(result);
				}, 1000);
		});
		return true;
	}


	/*	@name loadBorrows
  		@description : Load The 5 latest Borrows
	*/
	function loadBorrows() {
		showLoader($(".borrows-list"));
		$.getJSON('../lib_ajax/dynamic_data.php?data=borrows&limit=5', function(result) {
			setTimeout(function() {
				updateBorrows(result);
			}, 1000);
		});
		return true;
	}

	/*	@name cancel
  		@description : Cancels an operation
	*/
	function cancel(find, replace, ajax) {
		$("#adminForm").submit(function() {
			return false();
		});
		$(find).slideUp('fast');
		$(replace).slideDown('fast').show();
		if(ajax == 1)
			$(".ajax").html("LibrAta Tips");
		else
			$(".ajax2").html("Image Slide");
	}


	/* gets the current user section from the server as Password */
	function serveMylevel() {
		$.get(dir + "verifylevel.php?source=extract", function(data, status) {
			switch(data) {
				case 'catalogue':
					var trunc = ["backs", "addNewUser", "newAdmin", "libSettings", "adminCol", "borrowsR"];
					for(i = 0; i < trunc.length; i++) {
						$("#"+trunc[i]).remove();
					}
				break;

				case 'circulation':
					var trunc = ["backs", "addNewUser", "newAdmin", "libSettings", "adminCol", "booka"];
					for(i = 0; i < trunc.length; i++) {
						$("#"+trunc[i]).remove();
					}
				break;

				default:
				break;
			}
		});
	}

	function setHeader(text) {
		$(".ajax").html(text);
	}

	/* Show AJA loader */
	function showLoader(target) {
		$(target).html('<center style="display:block;"id="loading..."><img src="../lib_content/loading11.gif"/></center>');
		target.show();
	}

	/* Clear with Delay */
	function clearT(target) {
		setTimeout(function() {
			target.slideUp('fast').empty();
		}, 4000);
	}

	/* Clear without delay */
	function clearFast(target) {
			target.empty();
	}

/* LOCKS THE SCREEN */
	function lockSESSION() {
		$.get('../lib_ajax/lock.php', function(data) {
			if(data == 'lock') {
				$('#lkscr').css('z-index', 2).slideDown('slow');
				$(".wrapper").slideUp('fast');
				$("body").addClass("hold-transition lockscreen");
				$("#lpassword").val("");
			} else {
				createModal('Error Status', "AN ERROR HAS OCCURED AND CANNOT LOCK THE SESSION.", 'error');
			}
		});
	}

/* UNLOCKS THE SCREEN */
	function unlockSESSION() {
		var target = $("#info");
		var password = $("#lpassword").val();
		if(password != '' && password != null) {
			$.post('../lib_ajax/process.php', $("#lockForm :input").serializeArray(), function(info) {
				switch(info) {
					case 'true':
						{
							$.get('../lib_ajax/unlock.php', function(data) {
								if(data == 'unlock') {
									$('#lkscr').css('z-index', 2).slideUp('fast');
									$(".wrapper").slideDown('slow');
									$("body").removeClass("hold-transition lockscreen");
								} else {
									createModal('Error Status', "AN ERROR HAS OCCURED AND CANNOT UNLOCK THE SESSION.", 'error');
								}
							});
						}
					break;

					case 'false':
						{
							target.empty().hide();
							target.html("<h4 style=\"color:red;\">Unable to login. Please try again.</h4>").slideDown('fast');
							clearT(target);
						}
					break;
					default:
						target.empty().hide();
						target.html(info).slideDown('fast');
						clearT(target);
					break;
				}
			});
		} else {
			target.empty().hide();
			target.html('<p style="color:red;">Please enter password!</p>').slideDown('fast');
			clearT(target);
		}
		$("#lockForm").submit(function() {
			return false;
		});
	}

	function loadAdmins() {
		showLoader($("#lib_admin .users-list"));
		$.getJSON('../lib_ajax/dynamic_data.php?data=admin', function(result) {
			
				setTimeout(function() {
					updateAdmin(result);
				}, 1000);
			
		});

		return true;
	}

	/*@name updateBooks
 	  @description : update Books list 
	*/
	function updateBooks(result) {
		$("#lib_books .books-list").empty();
		 $("ul.books-list").empty();
		var numBooks = 0;
		if(result.length == 0) {
			totalBooks = 0;
			 var bookList = 'Book Table is empty';
			 $("ul.books-list").html(bookList);
		} else {
			totalBooks = result.length;
			if(result.length == undefined) {
				var bookList = '<li class="item"><div class="product-img"><img height="50px" width="50px" src="img/book.png" alt="Product Image"></div><div class="product-info">';
					bookList +=  '<a realbookid="'+result['book_id']+'" id="'+result['acc_no']+'" href="#Home" class="product-title">'+result['title']+'<span class="label label-warning pull-right">'+result['acc_no']+'</span></a>';
	                bookList += '<span class="product-description">'+result['author']+'</span></div></li>';
					$("ul.books-list").html(bookList);
			} else {
				$.each(result, function(i, field) {
					numBooks++;
						var bookList = '<li class="item"><div class="product-img"><img hieght="50px" width="50px" src="img/book.png" alt="Product Image"></div><div class="product-info">';
						bookList +=  '<a realbookid="'+field['book_id']+'" id="'+field['acc_no']+'" href="#Home" class="product-title">'+field['title']+'<span class="label label-warning pull-right">'+field['acc_no']+'</span></a>';
		                bookList += '<span class="product-description">'+field['author']+'</span></div></li>';
						$("ul.books-list").append(bookList);
				});
			}
			//Attaching click event to the list
			attach_event_books();
		}
	}

	/*@name updateBorrows
 	  @description : updateBorrows list 
	*/
	function updateBorrows(result) {
		$(".borrows-list").empty();
		var count = 0;
		if(result.length == 0) {
			totalBorrows = 0;
			 var borrowList = 'Borrow List is empty.';
			 $(".borrows-list").html(borrowList);
		} else {
			totalBorrows = result.length;
			if(result.length == undefined) {
				var due_date = new Date(result['due_date']);
				var count = 1;
				var borrowList = '<tr id="Borrow'+count+'"><td><a class="borrow_list_each" id="'+result['acc_no']+'" href="#Home">'+result['acc_no']+'</a></td><td>'+result['title']+'</td><td><div class="lafgbel lafgbel'+count+' lafbel-success">';
				borrowList += '<span class="days'+count+'"></span>-<span class="hours'+count+'"></span>-<span class="minutes'+count+'"></span>-<span class="seconds'+count+'"></span></div></td>';
				borrowList +=  '<td><div class="sparkbar" data-color="#00a65a" data-height="20"><a href="#Home" class="user_borrow_each user_borrow_each'+result['acc_no']+'" id="'+result['lib_no']+'">'+result['lib_no']+'</a></div></td>';
	            borrowList += '</tr>';
				$(".borrows-list").html(borrowList);
				var tt = getTimeRemaining(due_date);
				if(tt.total <= 0) {
					$(".lafgbel"+count).html('+'+(-1*tt.days)+' day(s) due');
					$(".lafgbel"+count).css("color", "red");
				} else {
					initializeClock('Borrow'+count, due_date, count);
				}
			} else {
				$.each(result, function(i, field) {
					var due_date = new Date(field['due_date']);
					var borrowList = '<tr id="Borrow'+count+'"><td><a class="borrow_list_each" id="'+field['acc_no']+'" href="#Home">'+field['acc_no']+'</a></td><td>'+field['title']+'</td><td><div class="lafgbel lafgbel'+count+' lafbel-success">';
					borrowList += '<span class="days'+count+'"></span>-<span class="hours'+count+'"></span>-<span class="minutes'+count+'"></span>-<span class="seconds'+count+'"></span></div></td>';
					borrowList +=  '<td><div class="sparkbar" data-color="#00a65a" data-height="20"><a href="#Home" class="user_borrow_each user_borrow_each'+field['acc_no']+'" id="'+field['lib_no']+'">'+field['lib_no']+'</a></div></td>';
		            borrowList += '</tr>';
					$(".borrows-list").append(borrowList);
					var tt = getTimeRemaining(due_date);
					if(tt.total <= 0) {
						$(".lafgbel"+count).html('+'+(-1*tt.days)+' day(s) due');
						$(".lafgbel"+count).css("color", "red");
					} else {
						initializeClock('Borrow'+count, due_date, count);
					}
						
					count++;
				});
			}

			attach_event_borrows();
			attach_event_borrower();
		}
	}

	/*@name updateOthers
 	  @description : updates the little stats on the top 
	*/
	function updateOthers(data) {
		var nUser = (data['user'] > 1) ? data['users']+' Users' : data['users']+' User';
		var nBook = (data['books'] > 1) ? data['books']+' Books' : data['books']+' Book';
		var nBorrow = (data['borrows'] > 1) ? data['borrows']+' Books' : data['borrows']+' Book';
		var nDue = (data['dues'] > 1) ? data['dues']+' Books' : data['dues']+' Book';
		$(".users-number").html(nUser);
		$(".books-number").html(nBook);
		$(".borrows-number").html(nBorrow);
		$(".due-number").html(nDue);
	}

	/*@name loadBorrowDetail
 	  @description : loads Details of a Transaction 
	*/
	function loadBorrowDetail(acc_no, lib_no) {
		showMain();
		set_crumb('View Borrow');
		$(".ajax2").html('load');
		$(".ajax2").html('Loading... Please wait.');
		var target = $("#loaderGIF2");
		var space = $("#loadPlaceAjax2");
		var adPlace = $("#eachBook");
		space.children().hide();
		showLoader(target);
		target.show();
		var button = '<button onclick="cancel(\'#eachBook\', \'#libCarousel\', 2)" ';
		button += 'class="pull-left btn btn-danger btn-sm btn-flat" id=""><i class="fa fa-arrow-circle-left"></i>';
		button += ' Close </button><button onclick="" class="pull-left btn btn-sm btn-primary btn-flat borrow_Rbook" id="">'; 
		button += 'Renew <i class="fa fa-arrow-circle-right"></i></button><button onclick="" class="pull-left btn btn-sm btn-default btn-flat borrow_Tbook" id="">Terminate <i class="fa fa-arrow-circle-right"></i></button>';	
		

		/* Generating the clicked Borrow */
		/* Performing Ajax stuffs */
		setTimeout(function() {
			target.empty();
			$(".ajax2").html('Details of this borrow');
			$.getJSON("../lib_ajax/dynamic_data.php?data=getBorrow&acc_no="+acc_no+"&lib_no="+lib_no, function(result) {
				//Emptying space
				adPlace.empty();
				adPlace.append("<label>Book Access no.:  "+result['acc_no']+"</label><br/>");
				adPlace.append("<label>Call number:  "+result['call_number']+"</label><br/>");
				adPlace.append("<label>Book title:  "+result['title']+"</label><br/>");
				adPlace.append("<label>Author:  "+result['author']+"</label><br/>");
				adPlace.append("<label>Publisher:  "+result['publisher']+"</label><br/>");
				adPlace.append("<label>ISBN:  "+result['ISBN']+"</label><br/>");
				adPlace.append("<label>Date Borrowed:  "+result['date']+"</label><br/>");
				adPlace.append("<label>Due Date:  "+result['due_date']+"</label><br/>");
				adPlace.append("<label id=\"acc_no\" style=\"display:none;\">"+result['acc_no']+"</label><br/>");
				adPlace.append(button);
				adPlace.slideDown('fast').show();

				// Attaching listener to the buttons
				$(".borrow_Rbook").click(function() {
					renewTra(lib_no, acc_no);
				});
				$(".borrow_Tbook").click(function() {
					if(delTra(lib_no, acc_no))
						cancel('#eachBook', '#libCarousel', 2);
				});
			});
		}, 2000);
	}

	/*@name updateAdmin
 	  @description : update admin list 
	*/
	function updateAdmin(result) {
		$("#lib_admin .users-list").empty();
		$("ul.contacts-list").empty();
		
		var numAdmin = 0;
		$.each(result, function(i, field) {
			var section = (field['section'] == 'superDUPER') ? 'General' : field['section'];
			numAdmin++;
			if(section != null) {
				var userList = '<li><img src=\"img/default.png\" alt=\"User Image\">';
				userList +=  '<a id="'+field['admin_id']+'" class="each_admin_list" class=\"users-list-name\" href=\"#Home\">'+field['fname']+' '+field['lname']+'</a>';
                userList += '<span class=\"users-list-date\">'+section+'</span></li>';
				$("ul.users-list").append(userList);
			

				var contactList = '<li><a id="'+field['admin_id']+'" href=\"#\"><img class=\"contacts-list-img\" src=\"/lib_admin/img/default.png\">';
                contactList += '<div class=\"contacts-list-info\"><span class=\"contacts-list-name\">'+field['fname']+' '+field['lname']+'</span></div></a></li>';
                
            	 $("ul.contacts-list").append(contactList);
            }
		});
		var numAd = (numAdmin > 1) ? "+" + numAdmin + " Administrators" : "+" + numAdmin + " Administrator";
		$("#numAdmin").html(numAd);

		/* Adding Click event to each Admin*/
		attach_event_admins();
	}

	/*@name delBook
 	  @description : deletes a book
 	  @bug: does not return data
	*/
	function delBook(acc_no, realbookID, data) {
		if(confirm('Are you sure you want to delete this book?')) {
			var url = '../lib_ajax/dynamic_data.php?data=del_book&book_id='+realbookID+'&acc_no='+acc_no;
			$.get(url, function(info, status) {
				switch(info) {
					case 'done':
						data.remove();
					break;
					default:
						createModal('Error Status', info, 'error');
						return false;
					break;
				}
			});
		}
	}

	/*@name attach_event_for_actions
 	  @description : attaches click event to admin list 
	*/
	function attach_event_for_actions() {
		$.get('../lib_ajax/verifylevel.php?source=jjjSon', function(data, status) {
			if(data == catKEY || data == generalKEY) {
				$(".del_book").click(function() {
					var acc_no = $(this).attr('id');
					var tr = $("#book_tr"+acc_no);
					var realbookID = tr.attr('realbookid');

					//A Bug lies here
					delBook(acc_no, realbookID, tr);
				});

				$(".ed_book").click(function() {
					var acc_no = $(this).attr('id');
					var realbookID = $("#book_tr"+acc_no).attr('realbookid');
					var initialValues = [$("#authort"+acc_no).html(), $("#titlet"+acc_no).html(), $("#publishert"+acc_no).html(), $("#ISBNt"+acc_no).html(), $("#call_numbert"+acc_no).html(), $("#acc_not"+acc_no).html()];
					//alert(realbookID);
					$("#actsOFA").hide();
					$(".book_text"+acc_no).each(function() {
						$(this).hide();
					});
					$(".book_input"+acc_no).each(function() {
						$(this).show();
					});
					$("#book_tr"+acc_no).change(function() {
						//The data of that row has changed so we need to submit them submit them
						var author = $("#author"+acc_no).val();
						var title= $("#title"+acc_no).val();
						var publisher = $("#publisher"+acc_no).val();
						var ISBN = $("#ISBN"+acc_no).val();
						var call_number = $("#call_number"+acc_no).val();
						var access_no = $("#acc_no"+acc_no).val();

						var newValues = [author, title, publisher, ISBN, call_number, access_no];

						var data = 'book_id='+realbookID+'&acc_no='+access_no+'&title='+title+'&publisher='+publisher+'&ISBN='+ISBN+'&call_number='+call_number+'&author='+author;

						if((author.length && title.length && publisher.length && ISBN.length && call_number.length && access_no.length > 0) && (initialValues != newValues)) {
							$.ajax({
								type: 'POST',
								url: '../lib_ajax/dynamic_data.php?data=ed_book',
								data: data,
								cache: false,
								success: function(echo) {
									$("#authort"+acc_no).html(author);
									$("#titlet"+acc_no).html(title);
									$("#publishert"+acc_no).html(publisher);
									$("#ISBNt"+acc_no).html(ISBN);
									$("#call_numbert"+acc_no).html(call_number);
									$("#acc_not"+acc_no).html(access_no);

								}
							});
						} else {
							createModal('Error Status', "Please enter Something?", 'error');
						}
						
					});
					$(".book_input"+acc_no).mouseup(function() {
						return false;
					});

					$(document).mouseup(function() {
							$("#actsOFA").show();
							$(".book_text"+acc_no).each(function() {
								$(this).show();
							});
							$(".book_input"+acc_no).each(function() {
								$(this).hide();
							});

					});
				});
			}
		});
	}

	/*@name attach_event_admins
 	  @description : attaches click event to admin list 
	*/
	function attach_event_admins() {
		$("a.each_admin_list").each(function() {
			$(this).click(function() {
				set_crumb('Edit Administrator');
				var target = $("#loaderGIF");
				$(".ajax").html("Loading... Please wait.");
				var userid = $(this).attr("id");
				var uData = new Array();

				var name = $(this).html();
				var space = $("#loadPlaceAjax");
				var adPlace = $("#eachAdmin");
				space.children().hide();
				showLoader(target);
				target.show();
				var button = $("#ajaxButtonsCopy").html();	

				/* Generating the clicked ADministrator */
				/* Performing Ajax stuffs */
				setTimeout(function() {
					$(".ajax").html(name);
					target.empty();
					var priv = '';
					var priviledges = '  <b class="prstat"></b><form id="privForm"><i style="color:red;">This user can:</i><br/>';
							priviledges += 'Manage Books <input type="checkbox" name="booka" class="booka" value="booka"><br/>';
							priviledges += 'Manage Borrows <input type="checkbox" name="borrowsR" class="borrowsR" value="borrowsR"><br/>';
							priviledges += 'Create Backups <input type="checkbox" name="backs" class="backs" value="backs">';
							priviledges += '</form>';
					$.getJSON("../lib_ajax/dynamic_data.php?data=getUserAdmin&id="+userid, function(result) {
						//Emptying space
						adPlace.empty();
						var section = (result['section'] == 'superDUPER') ? 'General' : result['section'];
						adPlace.append("<label id='admsec'>SECTION: "+section+"</label><br/>");
						adPlace.append("<label>EMAIL: "+result['email']+"</label><br/>");
						adPlace.append("<label>USERNAME: "+result['username']+"</label><br/>");
						adPlace.append("<label id=\"userSalt\" style=\"display:none;\">"+result['admin_id']+"</label>");
						adPlace.append("<label>PRIVILEDGES:</label>");
						adPlace.append(priviledges);
						adPlace.append(button);
						adPlace.slideDown('fast');
						priv = result['priviledge'];
					});

					setTimeout(function() {
						$(".booka").click(function() {
							$(".booka").val('booka');
						});
						$(".borrowsR").click(function() {
							$(".borrowsR").val('borrowsR');
						});
						$(".backs").click(function() {
							$(".backs").val('backs');
						});
						

						if(priv['booka'] != undefined) {
							$(".booka").attr('checked', '');
							$(".booka").val(priv['booka']);
						} else {
							$(".booka").val('booka');
						}

						if(priv['borrowsR'] != undefined) {
							$(".borrowsR").attr('checked', '');
							$(".borrowsR").val(priv['borrowsR']);
						} else {
							$(".borrowsR").val('borrowsR');
						}

						if(priv['backs'] != undefined) {
							$(".backs").attr('checked', '');
							$(".backs").val(priv['backs']);
						} else {
							$(".backs").val('backs');
						}
						
						$("#privForm").change(function(e) {
							$.ajax({
								type: 'POST',
								cache: false,
								data: $("#privForm :input").serializeArray(),
								url: dir + '/lib_ajax/dynamic_data.php?data=updatePriviledge&uid='+$("#userSalt").html(),
								success: function(r) {
									if(r == 'done') {
										$(".prstat").attr('style', 'color:green;');
										$(".prstat").html("Priviledge updated").slideDown('fast');
										clearT($(".prstat"));
									} else if(r == 'not done') {
										$(".prstat").attr('style', 'color:red;');
										$(".prstat").html("Error: Can't change priviledge").slideDown('fast');
										clearT($(".prstat"));
									} else {
										$(".prstat").attr('style', 'color:red;');
										$(".prstat").html(r).slideDown('fast');
										clearT($(".prstat"));
									}
								},
								failure: function(r) {}
							});
						});
					}, 1000);

				}, 2000);

				
			});
		});
	}

	/*@name attach_event_books
 	  @description : attaches click event to each list 
	*/
	function attach_event_books() {
		$.get('../lib_ajax/verifylevel.php?source=jjjSon', function(data, status) {
			if(data == catKEY || data == generalKEY) {
				$("a.product-title").each(function() {
				$(this).on('click', function() {
					set_crumb('View Book');
					var target = $("#loaderGIF2");
					$(".ajax2").html("Loading... Please wait.");
					var name = $(this).html();
					var acc_no = $(this).attr("id");
					var realbookID = $(this).attr("realbookid");

					var space = $("#loadPlaceAjax2");
					var adPlace = $("#eachBook");
					space.children().hide();
					showLoader(target);
					target.show();
					var button = '<button onclick="cancel(\'#eachBook\', \'#libCarousel\', 2)" ';
					button += 'class="pull-left btn btn-default btn-sm btn-flat" id=""><i class="fa fa-arrow-circle-left"></i>';
					button += ' Cancel </button>'; 
					button += '<button class="pull-left btn btn-sm btn-danger btn-flat button_Dbook'+acc_no+'" id="">';	
					button += 'Delete Book <i class="fa fa-arrow-circle-right"></i></button>';

					/* Generating the clicked ADministrator */
					/* Performing Ajax stuffs */
					setTimeout(function() {
						$(".ajax2").html(name);
						target.empty();
						$.getJSON("../lib_ajax/dynamic_data.php?data=getBook&acc_no="+acc_no, function(result) {
							//Emptying space
							adPlace.empty();

							adPlace.append("<div><label>Book Access no.:  "+result['acc_no']+"</label><br/>");
							adPlace.append("<label>Call number:  "+result['call_number']+"</label><br/>");
							adPlace.append("<label>Book title:  "+result['title']+"</label><br/>");
							adPlace.append("<label>Author:  "+result['author']+"</label><br/>");
							adPlace.append("<label>Publisher:  "+result['publisher']+"</label><br/>");
							adPlace.append("<label>ISBN:  "+result['ISBN']+"</label><br/>");
							adPlace.append("<label>Date Added:  "+result['date']+"</label><br/>");
							adPlace.append("<label id=\"acc_no\" style=\"display:none;\">"+result['acc_no']+"</label></div>");
							adPlace.append("<label>Book Availability:  "+result['bStatus']+"</label><br/>");
							adPlace.append(button);
							adPlace.slideDown('fast');
							$(".button_Dbook"+acc_no).click(function() {
								delBook(acc_no, realbookID, null);
								cancel('#eachBook', '#libCarousel', 2);
							});	
						});
					}, 2000);
					
					
				});
		});
			} else {

			}
		});
	}


	/*@name attach_event_borrows
 	  @description : attaches click event to each list 
	*/
	function attach_event_borrows() {
		$.get('../lib_ajax/verifylevel.php?source=jjjSon', function(data, status) {
			if(data == circKEY || data == generalKEY) {
				$("a.borrow_list_each").each(function() {
					$(this).on('click', function() {
						var acc_no = $(this).attr("id");
						var lib_no = $('.user_borrow_each'+acc_no).attr('id');
						loadBorrowDetail(acc_no, lib_no);
					});
				});
			} else {

			}
		});
	}


	/*@name attach_event_borrower
 	  @description : attaches click event to each list 
	*/
	function attach_event_borrower() {
		$.get('../lib_ajax/verifylevel.php?source=jjjSon', function(data, status) {
			if(data == circKEY || data == generalKEY) {
				$("a.user_borrow_each").each(function() {
					$(this).on('click', function() {
						var lib_no = $(this).html();
						//alert(lib_no);
						//var lib_no = $('.user_borrow_each'+acc_no).attr('id');
						var statusPlace = $("#lbnoSt");
						chklbno(lib_no, statusPlace);
						if(!currentError) {
							getUserClearance(lib_no);
						}
						//loadBorrowDetail(acc_no, lib_no);
					});
				});
			} else {

			}
		});
	}	

	/*@name uDelete
	  @description : deletes admin 
	*/
	function uDelete() {
		if(confirm('ARE YOU SURE YOU WANT TO DELETE THIS ADMINISTRATOR?')) {
			var admin_id = $("#userSalt").html();
			var url = '../lib_ajax/dynamic_data.php?data=delete&admin_id='+admin_id;
			var adPlace = $("#eachAdmin");
			$.get(url, function(info, status) {
				switch(info) {
					case "done":
						alert('ADMINISTRATOR DELETED!');
						cancel(adPlace);
						adPlace.empty();
						$("#"+admin_id).parent().remove();
					break;
					default:
						alert(info);
					break;
				}
			});
	 		
	 	} else {

	 	}
	}

	/*@name pReset
	  @description : resets Password 
	*/
	function pReset() {
		if(confirm('ARE YOU SURE YOU WANT TO RESET THE PASSWORD?')) {
			var admin_id = $("#userSalt").html();
			var url = '../lib_ajax/dynamic_data.php?data=resetPass&admin_id='+admin_id;
			var adPlace = $("#eachAdmin");
			$.get(url, function(info, status) {
				switch(info.length) {
					case 8:
						createModal('Password Reset',getSuccessText('PASSWORD RESET COMPLETE! \n THE NEW PASSWORD IS '+ info),'');
					break;

					default:
						createModal('Error Status', info, 'error');
					break;
				}
			});
	 		
	 	} else {

	 	}
	} 

	/*@name changeSection
	  @description : Changes Section 
	*/
	function changeSection(section) {
		if(confirm('ARE YOU SURE YOU WANT TO DO THIS?')) {
			var admin_id = $("#userSalt").html();
			var url = '../lib_ajax/dynamic_data.php?data=changeSection&admin_id='+admin_id+'&section='+section;
			var adPlace = $("#eachAdmin");
			$.get(url, function(info, status) {
				switch(info) {
					case 'done':
						var sec = (section == 'superDUPER') ? 'General' : section;
						$("#admsec").html("SECTION: "+sec);
						createModal('Change Section', getSuccessText('SECTION CHANGE IS COMPLETE!'), '');
					break;

					default:
						createModal('Error Status',info, 'error');
					break;
				}
			});
	 		
	 	} else {

	 	}
	}

	/*@name getTimeRemaining
	  @description : gets the remaining time 
	*/
	function getTimeRemaining(endtime){  
		var t = Date.parse(endtime) - Date.parse(new Date());  
		var seconds = Math.floor( (t/1000) % 60 );  
		var minutes = Math.floor( (t/1000/60) % 60 );  
		var hours = Math.floor( (t/(1000*60*60)) % 24 );  
		var days = Math.floor( t/(1000*60*60*24) );  
		return {    'total': t,    'days': days,    
				'hours': hours,    'minutes': minutes,    
				'seconds': seconds  };
	}

	/*
	 	@name initializeClock
	  	@description : starts the countdown
	*/
	function initializeClock(id, endtime, attche) {  
		var clock = $("#"+id);  
		var daysSpan = $('.days'+attche);  
		var hoursSpan = $('.hours'+attche);  
		var minutesSpan = $('.minutes'+attche);  
		var secondsSpan = $('.seconds'+attche);

		//Updates the Clock every sec
		function updateClock() {    
			var t = getTimeRemaining(endtime);    
			daysSpan.html(('0' + t.days).slice(-2));    
			hoursSpan.html(('0' + t.hours).slice(-2));    
			minutesSpan.html(('0' + t.minutes).slice(-2));    
			secondsSpan.html(('0' + t.seconds).slice(-2));    
			if(t.total <= 0) {
				clearInterval(timeinterval);    
			}  
		} 
		updateClock();  
		var timeinterval = setInterval(updateClock,1000);
	}


	/*@name addBooks
	  @description : called to attach an event for book addition
	*/
	function addBook() {
			$("#nBookForm").submit(function() {
				return false;
			});
			var counti = 0;//fixes the issue of returning input empty when none is empty
			$("#nBookForm :input").each(function(position) {
				$(this).css('border-color','green');
				if($(this).val() == '') {
					counti++;
					$(this).css('border-color','red');
				} else {

				}
			});

				if(counti != 0) {
					alert("Some input(s) is/are Empty.");
				} else {
					$("#sendAddBook").addClass("disabled");
					$.post("../lib_ajax/dynamic_data.php?data=newBook", $("#nBookForm :input").serializeArray(), function(info) {
						switch(info) {
							case 'done':
								createModal('New Book', getSuccessText("New Book has been added succcessfully."), '');
								$("#nBookForm :input").each(function(position) {
									$(this).val("");
								});
								$("#sendAddBook").removeClass("disabled");
							break;

							case 21:
								createModal('Error Status', info, 'error');
								lockSESSION();
							break;

							default:
								createModal('Error Status', info, 'error');
								$("#sendAddition").removeClass("disabled");
							break;
						}
					});


				}
	}

	/*@name viewBooks
	  @description : loads all the books
	*/
	function viewbooks() {
		window.location = "#Home";
		var oldSpace = $("#maincontent");
		oldSpace.slideUp('fast');
		var space = $('#ajaxContent');
		if(totalBooks == 0) {
			space.html("Books List is Empty");
		} else {
			showLoader(space);
			setTimeout(function() {
				space.load('../lib_tpl/books.tpl', function() {
					showLoader($("#bookList"));
					var url = '../lib_ajax/dynamic_data.php?data=books&limit=all';
					$.getJSON(url, function(result) {
							setTimeout(function() {
								$("#bookList").empty();
								var count = 0;
								var limit = 10;
								if(result.length == undefined) {
									var count =1;
									var  strpClass = ((count % 2) == 0) ? 'even' : 'odd'; 
									var check_input = '<input type="checkbox" name="select_book[]" id="'+result['acc_no']+'"/>';
									var actionS = '<img class="ed_book" id="'+result['acc_no']+'" style="cursor:pointer;" src="../lib_content/action_edit.png"/><img class="del_book" id="'+result['acc_no']+'" style="cursor:pointer;" src="'+'../lib_content/action_delete.png"/>';
									var eachbook = '<tr realbookID="'+result['book_id']+'" id="book_tr'+result['acc_no']+'"class="'+strpClass+'" role="row">';
									//Preparing for Editing
									var accBox = '<input class="liveEdit book_input'+result['acc_no']+'" value="'+result['acc_no']+'" type="text" name="acc_no" id="acc_no'+result['acc_no']+'"/>';
									var titleBox = '<input class="liveEdit book_input'+result['acc_no']+'" value="'+result['title']+'" type="text" name="title" id="title'+result['acc_no']+'"/>';
									var authorBox = '<input class="liveEdit book_input'+result['acc_no']+'" value="'+result['author']+'" type="text" name="author" id="author'+result['acc_no']+'"/>';
									var publisherBox = '<input class="liveEdit book_input'+result['acc_no']+'" value="'+result['publisher']+'" type="text" name="publisher" id="publisher'+result['acc_no']+'"/>';
									var call_numberBox = '<input class="liveEdit book_input'+result['acc_no']+'" value="'+result['call_number']+'" type="text" name="call_number" id="call_number'+result['acc_no']+'"/>';
									var ISBNBox = '<input class="liveEdit book_input'+result['acc_no']+'" value="'+result['ISBN']+'" type="text" name="ISBN" id="ISBN'+result['acc_no']+'"/>';
									//----------------------------
									eachbook += '<td style="width:1px;">'+check_input+'</td><td><span id="acc_not'+result['acc_no']+'" class="book_text book_text'+result['acc_no']+'">'+result['acc_no']+'</span>'+accBox+'</td>';
									eachbook += '<td><span id="titlet'+result['acc_no']+'" class="book_text book_text'+result['acc_no']+'">'+result['title']+'</span>'+titleBox+'</td><td><span id="authort'+result['acc_no']+'" class="book_text book_text'+result['acc_no']+'">'+result['author']+'</span>';
									eachbook += authorBox+'</td><td><span id="publishert'+result['acc_no']+'" class="book_text book_text'+result['acc_no']+'">'+result['publisher']+'</span>'+publisherBox+'</td><td><span id="call_numbert'+result['acc_no']+'" class="book_text book_text'+result['acc_no']+'">'+result['call_number']+'</span>'+call_numberBox+'</td>';
									eachbook += '<td><span id="ISBNt'+result['acc_no']+'" class="book_text book_text'+result['acc_no']+'">'+result['ISBN']+'</span>'+ISBNBox+'</td><td>'+actionS+'</td></tr>';
									$("#bookList").html(eachbook);
								} else {
									$.each(result, function(i, field) {
										var  strpClass = ((count % 2) == 0) ? 'even' : 'odd'; 
										var check_input = '<input type="checkbox" name="select_book[]" id="'+field['acc_no']+'"/>';
										var actionS = '<img class="ed_book" id="'+field['acc_no']+'" style="cursor:pointer;" src="../lib_content/action_edit.png"/><img class="del_book" id="'+field['acc_no']+'" style="cursor:pointer;" src="../lib_content/action_delete.png"/>';
										var eachbook = '<tr realbookID="'+field['book_id']+'" id="book_tr'+field['acc_no']+'"class="'+strpClass+'" role="row">';
										//Preparing for Editing
										var accBox = '<input class="liveEdit book_input'+field['acc_no']+'" value="'+field['acc_no']+'" type="text" name="acc_no" id="acc_no'+field['acc_no']+'"/>';
										var titleBox = '<input class="liveEdit book_input'+field['acc_no']+'" value="'+field['title']+'" type="text" name="title" id="title'+field['acc_no']+'"/>';
										var authorBox = '<input class="liveEdit book_input'+field['acc_no']+'" value="'+field['author']+'" type="text" name="author" id="author'+field['acc_no']+'"/>';
										var publisherBox = '<input class="liveEdit book_input'+field['acc_no']+'" value="'+field['publisher']+'" type="text" name="publisher" id="publisher'+field['acc_no']+'"/>';
										var call_numberBox = '<input class="liveEdit book_input'+field['acc_no']+'" value="'+field['call_number']+'" type="text" name="call_number" id="call_number'+field['acc_no']+'"/>';
										var ISBNBox = '<input class="liveEdit book_input'+field['acc_no']+'" value="'+field['ISBN']+'" type="text" name="ISBN" id="ISBN'+field['acc_no']+'"/>';
										
										//----------------------------

										eachbook += '<td style="width:1px;">'+check_input+'</td><td><span id="acc_not'+field['acc_no']+'" class="book_text book_text'+field['acc_no']+'">'+field['acc_no']+'</span>'+accBox+'</td>';
										eachbook += '<td><span id="titlet'+field['acc_no']+'" class="book_text book_text'+field['acc_no']+'">'+field['title']+'</span>'+titleBox+'</td><td><span id="authort'+field['acc_no']+'" class="book_text book_text'+field['acc_no']+'">'+field['author']+'</span>';
										eachbook += authorBox+'</td><td><span id="publishert'+field['acc_no']+'" class="book_text book_text'+field['acc_no']+'">'+field['publisher']+'</span>'+publisherBox+'</td><td><span id="call_numbert'+field['acc_no']+'" class="book_text book_text'+field['acc_no']+'">'+field['call_number']+'</span>'+call_numberBox+'</td>';
										eachbook += '<td><span id="ISBNt'+field['acc_no']+'" class="book_text book_text'+field['acc_no']+'">'+field['ISBN']+'</span>'+ISBNBox+'</td><td>'+actionS+'</td></tr>';
										$("#bookList").append(eachbook);
										count++;
									});
								}

								attach_event_for_actions();
								/* Setting the Data tables plugin */
								setTimeout(function() {
									$(function () {
			       						$("#books_Table").DataTable();
			       				 	});
								}, 5000);  
							}, 0000);
					});
				});
			}, 0000); 
		} space.show();
	}

	/*function to view the borrows*/
	function viewBorrow () {
		var oldSpace = $('#maincontent');
		oldSpace.slideUp('fast');
		var space = $('#ajaxContent');
		if(totalBorrows == 0) {
			space.html("Borrow List is Empty");
		} else {
			showLoader(space);
			setTimeout(function () {
				space.load('../lib_tpl/borrow.tpl', function(){
					showLoader($('#borrowList'));
					var url = '../lib_ajax/dynamic_data.php?data=borrows&limit=all';
					$.getJSON(url, function(result) {
						if(result.length == 0) {
							space.html("Books Table is Empty");
						} else {
							setTimeout(function() {
								$('#borrowList').empty();
								var count = 0;
								var limit = 10;
								if(result.length == undefined) {
									var count = 1;
									var due_date = result['due_date'];
										var strpClass = ((count % 2) == 0) ? 'even' : 'odd';
										var eachbook = '<tr id="fborrow'+count+'" class="'+strpClass+'" role="row">';
										eachbook += '<td class="sorting_1"><a id="'+result['acc_no']+'" class="borrow_list_each" href="#Home">'+result['acc_no']+'</a></td>';
										eachbook += '<td>'+result['title']+'</td><td class="lafgbel'+count+'"><span class="days'+count+'"></span>-<span class="hours'+count+'"></span>-<span class="minutes'+count+'"></span>-<span class="seconds'+count+'"></span></td><td>'+result['lib_no']+'</td><td>'+result['fname']+'</td></tr>';
										$("#borrowList").append(eachbook);
										
										var tt = getTimeRemaining(due_date);
										if(tt.total <= 0) {
											$(".lafgbel"+count).html('+'+(-1*tt.days)+' day(s) due');
											$(".lafgbel"+count).css("color", "red");
										} else {
											initializeClock('Borrow'+count, due_date, count);
										}
								} else {
									$.each(result, function(i, field) {
										var due_date = field['due_date'];
										var strpClass = ((count % 2) == 0) ? 'even' : 'odd';
										var eachbook = '<tr id="fborrow'+count+'" class="'+strpClass+'" role="row">';
										eachbook += '<td class="sorting_1"><a id="'+field['acc_no']+'" class="borrow_list_each" href="#Home">'+field['acc_no']+'</a></td>';
										eachbook += '<td>'+field['title']+'</td><td class="lafgbel'+count+'"><span class="days'+count+'"></span>-<span class="hours'+count+'"></span>-<span class="minutes'+count+'"></span>-<span class="seconds'+count+'"></span></td><td>'+field['lib_no']+'</td><td>'+field['fname']+'</td></tr>';
										$("#borrowList").append(eachbook);
										
										var tt = getTimeRemaining(due_date);
										if(tt.total <= 0) {
											$(".lafgbel"+count).html('+'+(-1*tt.days)+' day(s) due');
											$(".lafgbel"+count).css("color", "red");
										} else {
											initializeClock('Borrow'+count, due_date, count);
										}
										count++;
									});
								}
								/* setting the data tables pluging for borrowList*/
								$(function () {
									$('#example1').DataTable();
								});

								attach_event_borrows();
								attach_event_borrower();
							}, 2000);
						}
					});
				}); 
			}, 4000); 
		} space.show();	
	}

	/*@name prepBorrow
	/*@description prepares borrow form 
	*/
	function prepBorrow() {
			showMain();
			$("#loadPlaceAjax").children().hide();
			//$("#ajaxrow1").slideDown('fast');
			setHeader('Borrow a Book');
			var adPlace = $("#eachAdmin");
			var space = $("#ajaxrow1");
			space.hide();
			adPlace.empty();

			// #newAdmin Patch
			$("#newAdmin").hide();
			//Loading Starts
			adPlace.load( dir+ "/lib_tpl/borrowForm.tpl #borrowForm", function() {
				$(".borrow_Nbook").click(function() {
					if(currentError == true) {
					} else {
						var url = '../lib_ajax/dynamic_data.php?data=borrow';
						$.post(url, $("#bForm :input").serializeArray(), function(info) {
							switch(info) {
								case 'done':
									createModal('Borrow Book', getSuccessText("Borrow Successful"), '');
								break;

								case 'false':
									createModal('Error Status', "Not Done", '');
								break;

								case 'duplicate':
									if(confirm('THIS USER HAS ALREADY BORROW THIS BOOK.\n Press OK to View Details, otherwise Cancel.')) {
										loadBorrowDetail($(".acc_no").val(), $(".lb_number").val());
									}
								break;
								default:
									//##Improvement check wether the book has not been borrowed already
									createModal('Error Status', info, 'error');
								break;
							}
						});
					}
				});

				//Canceling submit
				$("#bForm").submit(function() {
					return false;
				});
				$(".lb_number").on('blur', function() {
	 				var lb_number = $(this).val();
	 				if(lb_number != '') {
	 					var statusPlace = $("#lb_number_status");
	 					chklbno(lb_number, statusPlace);
	 				}
	 				
	 			});

				//Verifying the Book access code
	 			$(".acc_no").on('blur', function() {
	 				var acc_no = $(this).val();
	 				if(acc_no != '') {
	 					var url = '../lib_ajax/dynamic_data.php?data=chkaccno&acc_no='+acc_no;
	 					$.get(url, function(info, status) {
		 					switch(info) {
		 						case 'true':
		 							$("#acc_number_status").html("<span style=\"color:green;\">Access number verified.</span>");
		 							currentError = false;
		 						break;

		 						case 'false':
		 							$("#acc_number_status").html("<span style=\"color:red;\">Invalid Access number.</span>");
		 							currentError = true;
		 						break;

		 						default:
		 							$("#acc_number_status").html("<span style=\"color:red;\">Cannot communicate with the server.</span>" + info);
		 							currentError = true;
		 						break;
		 					}
	 					});
	 				}
	 				
	 			});
			});
			//Loading Ends
			adPlace.show();
	}

	function chklbno(lib_number, statusPlace) {
		if(lib_number == '' || lib_number == null) {
			statusPlace.html('');
		} else {
			var url = '../lib_ajax/dynamic_data.php?data=chklbno&lib_no='+lib_number;
			$.get(url, function(info, status) {
				switch(info) {
					case 'true':
						statusPlace.html("<span style=\"color:green;\">Library number verified.</span>");
						currentError = false;
						return true;
					break;

					case 'false':
						statusPlace.html("<span style=\"color:red;\">Invalid Library number.</span>");
						currentError = true;
						return false;
					break;

					default:
						statusPlace.html("<span style=\"color:red;\">Cannot communicate with the server.</span>");
						currentError = true;
						return false;
					break;
				}
			});
		}
	}

	/*@name prepTrans
	/*@description prepares borrow form 
	*/
	function prepTrans() {
			showMain();
			var adPlace = $("#transact");
			var space = $("#ajaxrow1");
			space.hide();
			adPlace.empty();

			// #newAdmin Patch
			$("#newAdmin").hide();
			//Loading Starts
			adPlace.load("../lib_tpl/borrowForm.tpl #borrowForm", function() {
				$(".borrow_Nbook").click(function() {
					if(currentError == true) {
					} else {
						var url = '../lib_ajax/dynamic_data.php?data=borrow';
						$.post(url, $("#bForm :input").serializeArray(), function(info) {
							switch(info) {
								case 'done':
									alert("Done");
								break;

								case 'false':
									alert("Not Done");
								break;

								case 'duplicate':
									if(confirm('THIS USER HAS ALREADY BORROW THIS BOOK.\n Press OK to Renew, otherwise Cancel.')) {
										renewTra($(".lb_number").val(), $(".acc_no").val());
									}
								break;
							}
						});
					}
				});

				//Canceling submit
				$("#bForm").submit(function() {
					return false;
				});
				$(".lb_number").blur(function() {
	 				var lb_number = $(this).val();
	 				var url = '../lib_ajax/dynamic_data.php?data=chklbno&lib_no='+lb_number;
	 				$.get(url, function(info, status) {
	 					switch(info) {
	 						case 'true':
	 							$("#lb_number_status").html("<span style=\"color:green;\">Library number verified.</span>");
	 							currentError = false;
	 						break;

	 						case 'false':
	 							$("#lb_number_status").html("<span style=\"color:red;\">Invalid Library number.</span>");
	 							currentError = true;
	 						break;

	 						default:
	 							$("#lib_number_status").html("<span style=\"color:red;\">Cannot communicate with the server.</span>");
	 							currentError = true;
	 						break;
	 					}
	 				});
	 			});

				//Verifying the Book access code
	 			$(".acc_no").blur(function() {
	 				var acc_no = $(this).val();
	 				var url = '../lib_ajax/dynamic_data.php?data=chkaccno&acc_no='+acc_no;
	 				$.get(url, function(info, status) {
	 					switch(info) {
	 						case 'true':
	 							$("#acc_number_status").html("<span style=\"color:green;\">Access number verified.</span>");
	 							currentError = false;
	 						break;

	 						case 'false':
	 							$("#acc_number_status").html("<span style=\"color:red;\">Invalid Access number.</span>");
	 							currentError = true;
	 						break;

	 						default:
	 							$("#acc_number_status").html("<span style=\"color:red;\">Cannot communicate with the server.</span>" + info);
	 							currentError = true;
	 						break;
	 					}
	 				});
	 			});
			});
			//Loading Ends
			adPlace.show();
	}

	/*Edit profile*/
	function editProfile() {
		var oldSpace = $("#ajaxrow1");
		$(".ajax").text("Edit profile");
		var space = $("#ajaxrow1");
		var target = $("#loaderGIF");
		space.slideUp("fast");
		showLoader(target);
		setTimeout (function () {
			target.empty();
			$("#profile_form").load('../lib_tpl/borrowForm.tpl #profileForm', function () {
				var url = "../lib_ajax/dynamic_data.php?data=getProfile";
				$.getJSON(url, function (result) {
					var fname = result['fname'];
					var lname = result['lname'];
					var username = result['uname'];

					$(".p_fname").val(fname);
					$(".p_lname").val(lname);
					$(".p_uname").val(username);

				});
			}); $("#profile_form").show();
		}, 2000);	
	}

	/*Add New Bibliograph*/
	function addNewBook() {
		var oldSpace = $("#ajaxrow1");
		var space = $("#ajaxrow1");
		var target = $("#loaderGIF");
		showMain();
		space.slideUp("fast");
		showLoader(target);
		setTimeout (function () {
			target.empty();
			$("#profile_form").load('../lib_tpl/borrowForm.tpl #newBook', function () {
				var url = "../lib_ajax/dynamic_data.php?data=getProfile";
			}); $("#profile_form").show();
		}, 2000);	
	}

	/* Resets library default settings */
	function resetSettings() {
		if(confirm('Are you sure you want to reset Library settings to default?')) {
			$.get('../lib_ajax/dynamic_data.php?data=resetSettings', function(data, status) {
				if(data == 'done') {
					createModal("Library Settings", getSuccessText('Reset Successful. Please Reload.'), '');
				}
			});
		}
	}

	/*Edit profile*/
	function editSettings() {
		var oldSpace = $("#ajaxrow1");
		var space = $("#loadPlaceAjax");
		var target = $("#loaderGIF");
		space.children().slideUp("fast");
		showLoader(target);
		$("#loaderGIF").show();
		setTimeout (function () {
			target.empty();
			$("#lib_settingsPlace").load('../lib_tpl/borrowForm.tpl #settingsForm', function() {
				var url = "../lib_ajax/dynamic_data.php?data=getSettings";
				$.getJSON(url, function (result) {
					var lib_name = result['lib_name'];
					var due_period = result['due_period'];
					var school = result['school'];
					var libStatus = result['status'];
					var skin = result['skin'];
					var layout = result['layout'];
					var blimit = result['blimit'];

					$(".p_libname").val(lib_name);
					$(".p_school").val(school);
					$(".p_due").val(due_period);
					$(".p_limit").val(blimit);
					
					if(libStatus == 'on') {
						$(".p_status").attr('checked', '');
						$(".p_status").val(libStatus);
						$("#lbStat").html('<b id="lbStat" style="color:green;">On</b>');
					} else {
						$(".p_status").val(libStatus);
						$("#lbStat").html('<b id="lbStat" style="color:red;">Off</b>');
					}
					$(".s_layout").val(layout);
					$(".s_skin").val(skin);
					$(".s_layout").change(function() {
						$("body").attr('class', 'sidebar-mini');
						$("body").addClass($(".s_layout").val());
						$("body").addClass($(".s_skin").val());
					});
					$(".s_skin").change(function() {
						$("body").attr('class', '');
						$("body").addClass($(".s_layout").val());
						$("body").addClass($(".s_skin").val());
					});
				});
			}); 
			setTimeout(function() {
				attach_event_lbstat();
			}, 1000);
			
			$("#lib_settingsPlace").show();

		}, 1000);
	}

	/*
	For Editing Pics
	*/
	function editPics() {
		var oldSpace = $("#ajaxrow1");
		var space = $("#loadPlaceAjax");
		var target = $("#loaderGIF");
		space.children().slideUp("fast");
		showLoader(target);
		$("#loaderGIF").show();
		setTimeout (function () {
			target.empty();
			$("#lib_settingsPlace").load('../lib_tpl/borrowForm.tpl #picsForm', function() {
				var url = "../lib_content/slides/?data=getPics";
				$.getJSON(url, function (result) {
					$.each(result, function(i) {
						var pos = result[i].lastIndexOf('.');
						var name = result[i].substr(0, pos);
						var pic = '<li class="item " id="'+name+'"><div class="product-img">';
							pic += '<img src="../lib_content/slides/'+result[i]+'" alt="'+name+'"></div><div class="product-info">';
							pic += name+'<a id="'+result[i]+'" href="javascript::;" class="pic-delete"><span class="label label-danger pull-right">X</span></a>';
							pic += '<span class="product-description">'+name+'</span> </div></li>';
						$('.pic-list').append(pic);
					});   
				});

				setTimeout(function() {
					attach_event_pic_delete();
				
					$('#tuplSl').click(function() {
						var formData = '<center><form id="sPicForm" enctype="multipart/form-data" action="" method="post">';
							formData += '<div id="prSlide"><img height="100px" width="100px" id="pslide" src="../lib_content/no-preview.png"/></div>';
						    formData += '<div class="form-group">';
	       					formData += '<span id="spic_status">Add More Slide Picture:</span>';
	        				formData += '<input multiple="false" class="spic" name="fspic" id="fspic" type="file" required><span id="message"></span>';
	        				formData += '<button id="uplSl" class="btn btn-flat btn-sm btn-primary pull-right">Upload&raquo;</button></div></form></center>';
						createModalE('Upload Slide Image', formData, '');
						setTimeout(function() {
							$('#sPicForm').on('submit', function(e) {
								e.preventDefault();
								var url = "../lib_content/slides/?data=spic";
								var successText = getSuccessText('Upload Successful.');
								$.ajax({
									url: url, 
									type: "POST",
									data: new FormData(this), 
									cache: false,
									contentType: false,
									processData: false,
									success: function (response) {
										switch(response) {
											case 'done':
												createModal('Image Upload', successText, '');
											break;
											default:
												createModal('Upload Error', response, 'error');
											break;
										}
									} 
								});
							});

							$("#fspic").change(function() {
									var file = this.files[0];
									var imgType = file.type;
									var types = ["image/jpeg", "image/png", "image/jpg", "image/gif"];
									if(!((imgType == types[0]) || (imgType == types[1]) || (imgType == types[2]) || (imgType == types[3]))) {
										$("#message").html('<b style="color:red">Please select a valid image(jpg, jpeg, gif, png</b>');
										return false;
									} else {
										var reader = new FileReader();
										reader.onload = loadImg;
										reader.readAsDataURL(this.files[0]);
									}
							});
						}, 1000);
					});

					$('#lPicForm').on('submit', function(e) {
								e.preventDefault();
								var url = "../lib_ajax/dynamic_data.php?data=lpic";
								var successText = getSuccessText('Upload Successful.');
								$.ajax({
									url: url, 
									type: "POST",
									data: new FormData(this), 
									cache: false,
									contentType: false,
									processData: false,
									success: function (response) {
										switch(response) {
											case 'done':
												createModal('Image Upload', successText, '');
											break;
											default:
												createModal('Upload Error', response, 'error');
											break;
										}
									} 
								});
					});
				}, 1000);
			}); 
			$("#lib_settingsPlace").show();
		}, 2000);
	}

	function restoreData() {
		var oldSpace = $("#ajaxrow1");
		var space = $("#loadPlaceAjax");
		var target = $("#loaderGIF");
		space.children().slideUp("fast");
		showLoader(target);
		$("#loaderGIF").show();
		setTimeout (function () {
			target.empty();
			$("#lib_settingsPlace").load('../lib_tpl/borrowForm.tpl #restoreForm', function() {
				

				setTimeout(function() {
					attach_event_pic_delete();

					$('#lPicForm').on('submit', function(e) {
								e.preventDefault();
								var url = "../lib_includes/backuplib.php";
								var successText = getSuccessText('Restoration Successful.');
								$.ajax({
									url: url, 
									type: "POST",
									data: new FormData(this), 
									cache: false,
									contentType: false,
									processData: false,
									success: function (response) {
										showLoader($("#dstatus"));
										switch(response) {
											case 'done':
												$("#dstatus").html("");
												createModal('Data Restoration', successText, '');
											break;
											default:
												createModal('Restoration Error', response, 'error');
											break;
										}
									} 
								});
					});
				}, 1000);
			}); 
			$("#lib_settingsPlace").show();
		}, 2000);
	}

	function loadImg(e) {
		$("#prSlide").css("display", "block");
		$("#pslide").attr("src", e.target.result);
		$("#pslide").attr("height", '100px');
		$("#pslide").attr("width", '100px');
	}

	function saveSlPic(target) {
		//This disables the submit button
		if(target == 'slide') {
			$("#sPicForm").submit(function () {
				return false;
			});
			var is_empty = 0;
			$('#sPicForm :input').each(function () {
				if($(this).val() =='' || $(this).val()==null){
					is_empty++;
					$(this).css('border-color', 'red');
				} 
			});

			if(is_empty == 0) {	
				var successText = getSuccessText('Upload Successful.');
				var url = "../lib_content/slides/?data=spic";

				//communicating with the server
				$.ajax({
					url: url, 
					type: "POST",
					data: $("#sPicForm :input").serializeArray(), 
					cache: false,
					contentType: false,
					processData: false,
					success: function (data) {
						alert(data);
						switch(data) {
							case 'done':
								createModal('Image Upload', successText, '');
							break;
							default:
								createModal('Upload Status', response, '');
							break;
						}
					} 
				});
			}
		} else if(target == 'logo') {
			$("#lPicForm").submit(function () {
				return false;
			});
			var is_empty = 0;
			$('#lPicForm :input').each(function () {
				if($(this).val() =='' || $(this).val()==null){
					is_empty++;
					$(this).css('border-color', 'red');
				} 
			});

			if(is_empty == 0) {	
				var successText = getSuccessText('Upload Successful.');
				var url = "../lib_ajax/dynamic_data.php?data=spic";
				//communicating with the server
				$.post(url, $("#lPicForm :input").serializeArray(), function (response) {
					switch(response) {
						case 'done':
							createModal('Image Upload', successText, '');
						break;
						default:
							createModal('Error Status', response, 'error');
						break;
					}
				});
			}
		}	
	}

	/*@name attach_event_pic_delete
	 @description : Deletes images from slide
	*/
	function attach_event_pic_delete() {
		$.get('../lib_ajax/verifylevel.php?source=jjjSon', function(data, status) {
			if(data == generalKEY) {
				$("a.pic-delete").each(function() {
				$(this).on('click', function() {
					var src = $(this).attr("id");
					var pos = src.lastIndexOf('.');
					var id = src.substr(0, pos);
					/* Performing Ajax stuffs */
					if(confirm("Are you sure you want to delete this Picture?")) {
						$.get("../lib_content/slides/?data=delslide&src="+src, function(result) {
							switch(result)  {
								case 'done':
									$("#"+id).slideUp('fast').remove();
								break;

								default:
									createModal('Manage Picture', 'Picture not Deleted Successfully!', 'error');
								break;
							} 
						});
					}
				});
		});
			} else {
				lockSESSION();
			}
		});	
	}


	//this function validates and saves the profile
	function saveSettings() {
		//alert ('k');
		//This disables the submit button
		$("#sForm").submit(function () {
			return false;
		});
		var is_empty = 0;
		$('#sForm :input').each(function () {
			//this part verifies if any textbox is empty
				if($(this).val() == ''){
					if($(this).attr('type') != 'checkbox') {
						is_empty++;
						$(this).css('border-color', 'red');
					}
					
				}  
		});

		if(is_empty == 0) {	
			var newLibName = $(".p_libname").val();
			var url = "../lib_ajax/dynamic_data.php?data=setSettings";
			//communicating with the server
			$.post(url, $("#sForm :input").serializeArray(), function (response) {
				switch(response) {
					case 'done':
						createModal('Library Settings', getSuccessText("SETTINGS UPDATED."), '');
						$(".lib_Name").html(newLibName);
						$("body").attr('class', '');
						$("body").addClass($(".s_layout").val());
						$("body").addClass($(".s_skin").val());
					break;
					default:
						createModal('Error Status', response, 'error');
					break;
				}
			});
		} else {
			createModal('Error Status', "Check the inputs for empty slots", 'error');
		}
	}

	//this function validates and saves the profile
	function saveProfile () {
		//alert ('k');
		//This disables the submit button
		$("#pForm").submit(function () {
			return false;
		});
		var is_empty = 0;
		$('#pForm :input').each(function () {
			//this part verifies if any textbox is empty
			if ($(this).attr('type')=='text'){
				if($(this).val() =='' || $(this).val()==null){
					is_empty++;
					$(this).css('border-color', 'red');
				}
			}  
		});

		if(is_empty == 0) {	
			var successText = getSuccessText('Update Successful.');
			var newName = $(".p_fname").val() + ' ' + $(".p_lname").val();
			var url = "../lib_ajax/dynamic_data.php?data=setProfile";
			//communicating with the server
			$.post(url, $("#pForm :input").serializeArray(), function (response) {
				switch(response) {
					case 'done':
						createModal('Profile Update', successText, '');
						$(".adminName").html(newName);
					break;
					default:
						createModal('Error Status', response, 'error');
					break;
				}
			});
		}
	}

	//function to show recently added books details
	function showBookDetails () {
		$("a.product-title").each(function() {
			$(this).click(function() {
				alert('a click');
			});
		});	
	}

	function createModal(header, body, type) {
			var z_index = 1050;
			$(".m-o").css('z-index', z_index);
			$(".m-t").html(header);
			$("#dcontent").html(body);
			switch(type) {
				case 'confirm':
					$(".m-f").append('<button type="button" class="returnTrue btn btn-default btn-flat pull-left" data-dismiss="modal">Ok</button>');
				break;
				case 'error':
					$(".m-o").removeClass('modal-success');
					$(".m-o").addClass('modal-danger');
				break;
				case 'success':
					$(".m-o").removeClass('modal-danger');
					$(".m-o").addClass('modal-success');
				break;
				default:
					$(".m-o").removeClass('modal-danger');
					$(".m-o").removeClass('modal-success');
				break;
			}
			$(".m").css('z-index', '0');
			$(".m-o").slideDown('fast');
			$(".dismissM").click(function() {
				$(".m-o").slideUp('fast');
				$(".m").css('z-index', z_index);
			});
	}

	function createModalE(header, body, type) {
			var z_index = 1050;
		  	$(".m").css('z-index', z_index);
			$(".mt").html(header);
			$("#econtent").html(body);
			switch(type) {
				case 'confirm':
					$(".mf").append('<button type="button" class="returnTrue btn btn-default btn-flat pull-left" data-dismiss="modal">Ok</button>');
				break;
				case 'error':
					$(".m").removeClass('modal-success');
					$(".m").addClass('modal-danger');
				break;
				case 'success':
					$(".m").removeClass('modal-danger');
					$(".m").addClass('modal-success');
				break;
				default:
					$(".m").removeClass('modal-danger');
					$(".m").removeClass('modal-success');
				break;
			}
			$(".m-o").css('z-index', '0');
			$(".m").slideDown('fast');
			$(".dismissMe").click(function() {
				$(".m").slideUp('fast');
				$(".m-o").css('z-index', z_index);
			});
	}

	function popWindow(url) {
	    var SecondaryWin;
	    SecondaryWin = window.open(url,"secondary","resizable=yes,scrollbars=yes,width=800,height=400");
	    self.name="main";
	}

	function getUserClearance(lib_no) {
		var url = '../lib_ajax/dynamic_data.php?data=getUser&lib_no='+lib_no;
		var img = '<img style="position:relative; left:300px; top:-300px;" src="" height="200px" width="200px"/>';
		$.getJSON(url, function(result) {
			var printUrl = '../lib_ajax/print_clearance.php?record='+result['uid'];
				
				var userData = '<div style="position:relative;">';
			    userData += '<H4 style="color:green;">Personal Details</h4>';
			    userData += '<ul>';
			    userData += '<li>Name: '+result['fname']+' '+result['lname']+'</li>';
			    userData += '<li>Institution/Organisation No.: '+result['school_no']+'</li>';
			    userData += '<li>Facaulty: '+result['facaulty']+'</li>';
			    userData += '<li>Department: '+result['department']+'</li>';
			    userData += '<li>Level: '+result['level']+'</li>';
			    userData += '<li>Gender: '+result['sex']+'</li>';
			    userData += '<li>Phone: '+result['phone']+'</li>';
			    userData += '<li>Email: '+result['email']+'</li>';
			    userData += '<li>User Type: '+result['user_type']+'</li>';
			    userData += '<li>Number of Borrows: '+result['nBorrow']+'</li>';
			    userData += '<li>Number of Renewals: '+result['nRenewal']+'</li>';
			    userData += '</ul>';
			    userData += '<button id="clr'+result['uid']+'" class="btn btn-primary btn-sm btn-flat">Get Clearance</button>';
			    userData += '</div>';

			    createModal('Library User Data', userData, '');
			    $('#clr'+result['uid']).click(function() {
			    	javascript:popWindow(printUrl);
			    });
		});
	}

	function attach_event_lbstat() {
		$(".p_status").click(function() {
			if($(".p_status").val() == "on") {
				$("#lbStat").html('<b id="lbStat" style="color:red;">Off</b>');
				$(".p_status").val('off');
			} else if($(".p_status").val() == 'off') {
				$("#lbStat").html('<b id="lbStat" style="color:green;">On</b>');
				$(".p_status").val('on');
			}
		});
	}

/* A process of serving each section has to be done here */
//serveMylevel();

//LibrAta Starts...
$(document).ready(function() {
 	refreshApp();
 	startTipping(10);
 	$("#backupdb").click(function() {
		$.get(dir + '/lib_includes/backuplib.php', function(e) {});
	});

 	$(".restore_db").click(function() {
		$(this).addClass('active');
		set_crumb('Data Restoration');
		$("#maincontent").show();
		$("#ajaxContent").hide();
		$(".ajax").html("Restore Library Data");
		/* Performing Ajax stuffs */
		restoreData();
	});


 	$(".borrowB").click(function() {
 		set_crumb('Borrow Book');
 		prepBorrow();
 	});

 	$(".chkT").click(function() {
 		set_crumb('Check Transaction');
 		showMain();
 		// #newAdmin Patch
		$("#newAdmin").hide();

		$("#ajaxrow1").slideDown('fast');
		setHeader('Check Transaction');
		var adPlace = $("#eachAdmin");
		var space = $("#ajaxrow1");
		space.hide();
		adPlace.empty();
		adPlace.load("../lib_tpl/borrowForm.tpl #chkTForm");
		adPlace.show();
 	});

 	/* LIST OF ADMINISTRATORS */
 	if(loadAdmins()) {
 		setTimeout(function() {
 			attach_event_admins();
 		}, 3000); 
 	}

 	/* LIST OF BOOKS */
 	if(loadBooks()) {}

 	/* LIST OF LATEST BORROWS */
 	if(loadBorrows()) {}
 	
	$("#sout").click(function(){
		if(confirm('Are you sure you want to logout?') == true) {
			window.location = "../logout.php";
		}
	});

	$("#lockLib").click(function() {
		lockSESSION();
	});

	/* This part deals with the unlocking and locking of the screen 
	*/
	$("#unlockB").click(function(){
		unlockSESSION();
	});


	/* Adding New User with Ajax */
	$("#addNewUser").click(function() {
		$(this).addClass('active');
		set_crumb('Add Admin');
		$("#maincontent").show();
		$("#ajaxContent").hide();
		if(confirm("You are about to add a new administrator, Click Ok to continue.")) {
			var target = $("#loaderGIF");
			$(".ajax").html("Add Admin");

			/* Generating password for new ADministrator */
			$.get("../lib_ajax/getPass.php?len=8", function(data, status) {
				$("#adminPassGen").val(data);
			});
			
			$("#adminPassGen").attr("disabled", "");
			/* Performing Ajax stuffs */
			var space = $("#loadPlaceAjax").children();
			space.hide();
			showLoader(target);
			$("#loaderGIF").show();
			setTimeout(function() {
				$("#loaderGIF").hide();
				$("#newAdmin").show();
			}, 1000);
		} else {
		}
	});

	/* Sending to the server */
	$("#sendAddition").click(function() {
		$("#adminForm").submit(function() {
			return false;
		});

		var counti = 0;//fixes the issue of returning input empty when none is empty
		$("#adminForm :input").each(function(position) {
			$(this).css('border-color','green');
			if($(this).val() == '') {
				counti++;
				$(this).css('border-color','red');
			} else {

			}
		});

			if(counti != 0) {
				alert("Some input(s) is/are Empty.");
			} else {
				$("#sendAddition").addClass("disabled");
				$("#adminForm :input").each(function(position) {
					//$(this).attr("disabled", "");
				});
				$.post("../lib_ajax/addAdmin.php", $("#adminForm :input").serializeArray(), function(info) {
					var len = info.length;
					switch(len) {
						case 8:
							createModal('Create Administrator', getSuccessText("New Administrator has been added succcessfully.\n The password is "+ info +" \nPlease copy this out somewhere."), '');
						break;

						case 21:
							alert(info);
							lockSESSION();
						break;

						default:
							$("#sendAddition").removeClass("disabled");
							alert(info);
						break;
					}
				});


			}
	});

	//viewing all books
	$('#viewbooks').click(function () {
		$(this).addClass('active');
		set_crumb('View Books');
		viewbooks();
	});

	//viewing all borrows
	$("#viewBorrow").click(function () {
		set_crumb('View Borrow');
		viewBorrow();
	});

	//editing profile
	$("#profile").click(function () {
		$(this).addClass('active');
		set_crumb('Edit Profile');
		$("#loadPlaceAjax").children().hide();
		showMain();
		editProfile();
	});

	$("#Home").click(function() {
		showMain();
	});	

	$("#newBook").click(function() {
		$(this).addClass('active');
		set_crumb('Add New Bibliograph');
		$("#loadPlaceAjax").children().hide();
		$(".ajax").html("New Bibliograph");
		showMain();
		addNewBook();
	});	

	$("#lib_settings").click(function() {
		$(this).addClass('active');
		set_crumb('Library Settings');
		$("#maincontent").show();
		$("#ajaxContent").hide();
		$(".ajax").html("Edit Library Settings");
		/* Performing Ajax stuffs */
		editSettings();
	});

	$(".lib_pics").click(function() {
		$(this).addClass('active');
		set_crumb('Library Pics');
		$("#maincontent").show();
		$("#ajaxContent").hide();
		$(".ajax").html("Manage Library Pictures");
		/* Performing Ajax stuffs */
		editPics();
	});


	$(".userSearch").on('blur', function() {
		var statusPlace = $('.userSearchStatus');
		if($(".userSearch").val() == '') {
			statusPlace.html('');
		} else {
			setTimeout(function() {
				chklbno($(".userSearch").val(), statusPlace);
			}, 0000);
		}
	});

	$('#getUser').click(function() {
		if($(".userSearch").val() == '' || $(".userSearch").val() == null) {
			createModal('Library User Data', 'Please Enter the User\'s Library number in the space provided!', '');
		} else {
			if(!currentError) {
				getUserClearance($(".userSearch").val());
			}
		}
	});

	$('#userSearchForm').submit(function() {
		return false;
	});

	$("#librATA").click(function(){
				var helpText = '<h4>We hope this steps will help you:</h4>';
				helpText += '<ol>';
				helpText += '<li>Enter the passphrase as stated beneath the text box.</li>  ';
				helpText += '<li>Press the Enter key to access the OPAC.</li>  ';
				helpText += '<li>Once inside the OPAC, wait for it to load.</li>  ';
				helpText += '<li>After loading, input the *keyword of the material you are looking for inside the Search box at the top of the page.</li>  ';
				helpText += '<li>After typing your keyword(this can be the name of the Author or the title), the list is filtered base on what you type.</li>  ';
				helpText += '<li>Look through the filtered result to find what you are looking for.</li>';
				helpText += '</ol>';
				helpText += '<h5>* = Any word you know about the material.</h5>';
		createModal('About LibrATA', helpText, '');
	});

	$(".pHistory").click(function() {
		if(confirm('Purging history will delete all borrow that has been returned.\n Are you sure you want to do this?')) {
			$.get('../lib_ajax/dynamic_data.php?data=pHistory', function(data, status) {
				switch(data) {
					case 'done':
						createModal('Purge History', getSuccessText('Purging of History Successful.'), '');
					break;
					case 'not done':
						createModal('Purge History', 'No changes made', '');
					break;
					case 'unauthorised':
						lockSESSION();
					break;
					default:
						createModal("Error Status", data, "error");
					break;
				}
			});
		}
	});
});