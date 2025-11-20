# # 1. Featured post (most recent with image)
#     @action(detail=False, methods=['get'])
#     def featured(self, request):
#         post = Post.objects.filter(status="published", image__isnull=False, subcategory__slug="featured").order_by('-created_at').first()
#         serializer = PostSerializer(post, context={'request': request}) if post else None
#         return Response({"featured": serializer.data if serializer else None})

#     # 2. Trending (most viewed – add view_count later, or use recent)
#     @action(detail=False, methods=['get'])
#     def trending(self, request):
#         posts = Post.objects.filter(status="published", subcategory__slug="trending-now").order_by('-created_at')[0:4]
#         serializer = PostSerializer(posts, many=True, context={'request': request})
#         return Response({"trending": serializer.data})

#     # 3. Spotlight (manual tag or field later)
#     @action(detail=False, methods=['get'])
#     def spotlight(self, request):
#         posts = Post.objects.filter(status="published", subcategory__slug="entertainment").distinct()[0:3]
#         serializer = PostSerializer(posts, many=True, context={'request': request})
#         # print("Spotlight posts fetched:", posts)
#         return Response({"spotlight": serializer.data})
    
#     # 4
#     @action(detail=False, methods=['get'])
#     def bigDeal(self, request):
#         posts = Post.objects.filter(status="published", subcategory__slug="big-deal").distinct()[0:3]
#         serializer = PostSerializer(posts, many=True, context={'request': request})
#         # print("big_deal posts fetched:", posts)
#         return Response({"bigDeal": serializer.data})
    
#     # 5
#     @action(detail=False, methods=['get'])
#     def globalLens(self, request):
#         posts = Post.objects.filter(status="published", subcategory__slug="wired-world").distinct()[0:3]
#         serializer = PostSerializer(posts, many=True, context={'request': request})
#         # print("big_deal posts fetched:", posts)
#         return Response({"globalLens": serializer.data})
    
#     # 6
#     @action(detail=False, methods=['get'])
#     def africaRising(self, request):
#         posts = Post.objects.filter(status="published", subcategory__slug="africa-now").distinct()[0:3]
#         serializer = PostSerializer(posts, many=True, context={'request': request})
#         # print("big_deal posts fetched:", posts)
#         return Response({"africaRising": serializer.data})
    
#     # 7
#     @action(detail=False, methods=['get'])
#     def hardware(self, request):
#         post = Post.objects.filter(status="published", image__isnull=False, subcategory__slug="hardware").order_by('-created_at').first()
#         serializer = PostSerializer(post, context={'request': request}) if post else None
#         return Response({"hardware": serializer.data if serializer else None})
    
#     # 8
#     @action(detail=False, methods=['get'])
#     def emergingTech(self, request):
#         posts = Post.objects.filter(status="published", subcategory__slug="emerging-tech").distinct()[0:3]
#         serializer = PostSerializer(posts, many=True, context={'request': request})
#         # print("big_deal posts fetched:", posts)
#         return Response({"emergingTech": serializer.data})
    
#     # 9
#     @action(detail=False, methods=['get'])
#     def digitalMoney(self, request):
#         post = Post.objects.filter(status="published", image__isnull=False, subcategory__slug="digital-money").order_by('-created_at').first()
#         serializer = PostSerializer(post, context={'request': request}) if post else None
#         return Response({"digitalMoney": serializer.data if serializer else None})
    
#     #10
#     @action(detail=False, methods=['get'])
#     def techCulture(self, request):
#         posts = Post.objects.filter(status="published", subcategory__slug="tech-culture").distinct()[0:3]
#         serializer = PostSerializer(posts, many=True, context={'request': request})
#         # print("big_deal posts fetched:", posts)
#         return Response({"techCulture": serializer.data})
    
#     # 11
#     @action(detail=False, methods=['get'])
#     def secureHabits(self, request):
#         posts = Post.objects.filter(status="published", subcategory__slug="secure-habits").distinct()[0:3]
#         serializer = PostSerializer(posts, many=True, context={'request': request})
#         # print("big_deal posts fetched:", posts)
#         return Response({"secureHabits": serializer.data})

#     # 12
#     @action(detail=False, methods=['get'])
#     def keyPlayers(self, request):
#         posts = Post.objects.filter(status="published", subcategory__slug="key-players").distinct()[0:3]
#         serializer = PostSerializer(posts, many=True, context={'request': request})
#         # print("big_deal posts fetched:", posts)
#         return Response({"keyPlayers": serializer.data})

#     # 13
#     @action(detail=False, methods=['get'])
#     def AI(self, request):
#         posts = Post.objects.filter(status="published", subcategory__slug="ai").distinct()[0:3]
#         serializer = PostSerializer(posts, many=True, context={'request': request})
#         # print("big_deal posts fetched:", posts)
#         return Response({"AI": serializer.data})
    
#     # 14
#     @action(detail=False, methods=['get'])
#     def bchCrypto(self, request):
#         posts = Post.objects.filter(status="published", subcategory__slug="blockchain-crypto").distinct()[0:3]
#         serializer = PostSerializer(posts, many=True, context={'request': request})
#         # print("big_deal posts fetched:", posts)
#         return Response({"bchCrypto": serializer.data})
    
#     # 15
#     @action(detail=False, methods=['get'])
#     def startups(self, request):
#         posts = Post.objects.filter(status="published", subcategory__slug="startups").distinct()[0:3]
#         serializer = PostSerializer(posts, many=True, context={'request': request})
#         # print("big_deal posts fetched:", posts)
#         return Response({"startups": serializer.data})
    
#     # 16
#     @action(detail=False, methods=['get'])
#     def prvCompliance(self, request):
#         posts = Post.objects.filter(status="published", subcategory__slug="privacy-compliance").distinct()[0:3]
#         serializer = PostSerializer(posts, many=True, context={'request': request})
#         # print("big_deal posts fetched:", posts)
#         return Response({"prvCompliance": serializer.data})
    
#     # 17
#     @action(detail=False, methods=['get'])
#     def social(self, request):
#         post = Post.objects.filter(status="published", image__isnull=False, subcategory__slug="social").order_by('-created_at').first()
#         serializer = PostSerializer(post, context={'request': request}) if post else None
#         return Response({"social": serializer.data if serializer else None})
